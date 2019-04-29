var express = require('express');
var router = express.Router();
const Inscripcion = require('./../models/Inscripcion');

router.get('/', function(req, res, next) {
    Inscripcion.find({}, (err, listaInscritos) => {
        if (err) console.log(err);
        res.render('verinscritos', { title: 'Ver cursos',session: req.session, inscritos: listaInscritos });
    });
});

router.post('/', function(req, res, next) {
    Inscripcion.findOne({id: req.body.idCurso}, (err, inscrito) => {
        if (err) console.log(err);
        if(inscrito) {
            var alumnos = inscrito.estudiantes.filter(estudiante => estudiante.documento != req.body.documento);
            inscrito.estudiantes = alumnos;
            inscrito.save(function (err) {
                Inscripcion.find({}, (err, listaInscritos) => {
                    if (err) console.log(err);
                    res.render('verinscritos', { title: 'Ver cursos',session: req.session, eliminar_alumno: true, inscritos: listaInscritos });
                });
            });
        }
    });
});

module.exports = router;
