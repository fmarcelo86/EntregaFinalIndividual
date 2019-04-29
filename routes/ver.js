var express = require('express');
var router = express.Router();
const Curso = require('./../models/Curso');

router.get('/', function(req, res, next) {
    Curso.find({}, (err, listaCursos) => {
        if (err) console.log(err);
        var cursosDisponibles = listaCursos.filter(curso => curso.estado == 'disponible');
        res.render('ver', { title: 'Ver cursos',session: req.session, guardar_curso: true, cursos: listaCursos, cursosDisponibles: cursosDisponibles });
    });
});

router.post('/', function(req, res, next) {
    Curso.findOne({id: req.body.idCurso}, (err, cursoSel) => {
        if (err) console.log(err);
        cursoSel.estado = cursoSel.estado == 'disponible'?'cerrado':'disponible';
        cursoSel.save(function (err) {
            if (err) console.log(err);
            Curso.find({}, (err, listaCursos) => {
                if (err) console.log(err);
                var cursosDisponibles = listaCursos.filter(curso => curso.estado == 'disponible');
                res.render('ver', { title: 'Ver cursos',session: req.session, actualizar_curso: true, cursos: listaCursos, cursosDisponibles: cursosDisponibles });
            });
        });
    });
});

module.exports = router;
