var express = require('express');
var router = express.Router();
const Inscripcion = require('./../models/Inscripcion');
const Curso = require('./../models/Curso');

/* GET home page. */
router.get('/', function(req, res, next) {
    Curso.find({estado: 'disponible'}, (err, listaCursos) => {
        if (err) console.log(err);
        res.render('inscribir', { title: 'Inscribir curso',session: req.session, inscribir_curso: true, cursos: listaCursos});
    });
});

router.post('/', function(req, res, next) {
    var curso = JSON.parse(req.body.curso);
    Inscripcion.findOne({id: curso.id}, (err, inscripcion) => {
        if (err) console.log(err);
        let duplicado = null;
        if(inscripcion) {
            duplicado = inscripcion.estudiantes.find(inscrito => inscrito.documento == req.body.documento);
        } else {
            inscripcion = new Inscripcion(curso);
            //inscripcion.estudiantes = [];
        }
        if(duplicado) {
            res.render('inscribir', { title: 'Inscribir curso',session: req.session, error_inscribir: true, msgError:'Ya está registrado en este curso'});
        } else {
            delete req.body.curso;
            inscripcion.estudiantes.push(req.body);
            inscripcion.save();
            res.render('inscribir', { title: 'Inscribir curso',session: req.session, guardar_inscribir: true, nombre:req.body.nombre, curso:curso.nombre});
        }
    });

});

module.exports = router;
