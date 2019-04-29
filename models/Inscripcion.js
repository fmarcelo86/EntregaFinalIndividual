const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
    id: String,
    nombre: String,
    modalidad: String,
    valor: String,
    descripcion: String,
    horaria: String,
    estado: String,
    estudiantes: [{
        documento: String,
        correo: String,
        nombre: String,
        telefono: String
    }]
});

module.exports = mongoose.model('Inscripcion', inscripcionSchema);