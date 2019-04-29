var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
// Database
var mongoose = require('mongoose');

//mongodb://localhost:27017/SysMatricula
mongoose.connect('mongodb+srv://fmarcelo86:mVVZ95Ork2vKTuG2@cluster0-nzmfa.mongodb.net/SysMatricula?retryWrites=true', {useNewUrlParser: true}, (err, resultado) => {
    if (err){
        return console.log(error)
    }
    console.log("conectado")
});

var indexRouter = require('./routes/index');
var crearRouter = require('./routes/crear');
var verRouter = require('./routes/ver');
var inscribirRouter = require('./routes/inscribir');
var verInscritosRouter = require('./routes/verinscritos');
var verIngresarRouter = require('./routes/ingresar');
var chatRouter = require('./routes/chat');

var app = express();

//Session
app.use(session({
    secret: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    resave: false,
    saveUninitialized: true
}));

app.set('partials', path.join(__dirname, 'partials'));
hbs.registerPartials(path.join(__dirname, 'partials'));
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Hacer de nuestro db accesible a nuestro router
app.use(function(req,res,next){
    next();
});
/*
app.use('*', function(req,res,next){
    console.log(req.session);
    if (req.baseUrl != "" && (req.session.usuario == undefined || req.session.usuario == null)) {
        res.render('index', {title: 'Inicio'});
    } else {
        next();
    }
});*/

app.use('/', indexRouter);
app.use('/crear', crearRouter);
app.use('/ver', verRouter);
app.use('/inscribir', inscribirRouter);
app.use('/verinscritos', verInscritosRouter);
app.use('/ingresar', verIngresarRouter);
app.use('/registrar', verIngresarRouter);
app.use('/salir', verIngresarRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
