var express = require('express');
var router = express.Router();
const Curso = require('./../models/Curso');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('crear', { title: 'Crear curso',session: req.session, crear_curso: true });
});

router.post('/', function(req, res, next) {
    Curso.findOne({id: req.body.id}, (err, curso) => {
        if (err) console.log(err);
        if(curso) {
            res.render('crear', { title: 'Crear curso', error_curso: true,session: req.session, msgError:'Ya existe un curso con este id'});
        } else {
            req.body.estado = 'disponible';
            curso = new Curso(req.body);
            curso.save(function (err) {
                Curso.find({}, (err, listaCursos) => {
                    if (err) console.log(err);
                    res.render('crear', { title: 'Crear curso', guardar_curso: true,session: req.session, msg:req.body.nombre, cursos: listaCursos });
                });
            });
        }
    });
});

module.exports = router;
