const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    identidad: String,
    nombre: String,
    correo: String,
    telefono: String,
    clave: String,
    rol: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);