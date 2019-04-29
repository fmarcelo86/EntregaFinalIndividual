var express = require('express');
var router = express.Router();
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { Users } = require('./../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Chat', session: req.session });
});

const usuarios = new Users();

io.on('connection', client => {

    console.log("un usuario se ha conectado")

    client.on('usuarioNuevo', (usuario) =>{
        let listado = usuarios.agregarUsuario(client.id, usuario)
        console.log(listado)
        let texto = `Se ha conectado ${usuario}`
        io.emit('nuevoUsuario', texto )
    })

    client.on('disconnect',()=>{
        let usuarioBorrado = usuarios.borrarUsuario(client.id)
        let texto = `Se ha desconectado ${usuarioBorrado.nombre}`
        io.emit('usuarioDesconectado', texto)
    })

    client.on("texto", (text, callback) =>{
        let usuario = usuarios.getUsuario(client.id)
        let texto = `${usuario.nombre} : ${text}`

        io.emit("texto", (texto))
        callback()
    })

    client.on("textoPrivado", (text, callback) =>{
        let usuario = usuarios.getUsuario(client.id)
        let texto = `${usuario.nombre} : ${text.mensajePrivado}`
        let destinatario = usuarios.getDestinatario(text.destinatario)
        client.broadcast.to(destinatario.id).emit("textoPrivado", (texto))
        callback()
    })

});

module.exports = router;
