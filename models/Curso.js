const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    id: String,
    nombre: String,
    modalidad: String,
    valor: String,
    descripcion: String,
    horaria: String,
    estado: String
});

module.exports = mongoose.model('Curso', cursoSchema);