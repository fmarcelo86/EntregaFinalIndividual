var express = require('express');
var router = express.Router();
const Usuario = require('./../models/Usuario');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Inicio', session: req.session});
});

router.post('/', function(req, res, next) {
    if(req.baseUrl == "/ingresar") {
        Usuario.findOne({nombre : req.body.nombre}, (err, resultados) => {
            if (err) console.log(err);
            if(resultados == null || !bcrypt.compareSync(req.body.clave, resultados.clave)){
                res.render('index', { title: 'Inicio', msgError:'El usuario no existe'});
            } else {
                req.session.usuario = resultados._id;
                req.session.nombre = resultados.nombre;
                req.session["rol"+resultados.rol] = resultados.rol;
                res.render('index', { title: 'Inicio', session: req.session});
            }
        });
    } else if(req.baseUrl == "/salir") {
        delete req.session.usuario;
        delete req.session.nombre;
        delete req.session["rolAspirante"];
        delete req.session["rolCoordinador"];
        res.render('index', { title: 'Inicio'});
    } else {
        Usuario.findOne({$or:[{identidad:req.body.identidad}, {nombre: req.body.nombre}]}, (err, resultado) => {
            if (err) console.log(err);
            if(resultado != null) {
                res.render('index', { title: 'Inicio', msgError:'El usuario ya existe', session: req.session});
            } else {
                req.body.clave = bcrypt.hashSync(req.body.clave, 10);
                let usuario = new Usuario(req.body);
                usuario.save();
                res.render('index', { title: 'Inicio', msgError:'Usuario creado exitosamente', session: req.session});
            }
        });
    }
});

module.exports = router;
