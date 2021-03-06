const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const multer = require('multer');
const uuid = require('uuid/v4');    //es la manera de generar un id aleatorio

//initiliazations
const app = express();
require('./database');
require('./passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.engine('.hbs', exphbs({     /* motor de plantilla */
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));  //permite enviar otros method
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables Globales
app.use( (req, res, next) => {
    res.locals.success_msj = req.flash('success_msj');
    res.locals.error_msj = req.flash('error_msj');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//routes
app.use(require('../routes/routerIndex'));
app.use(require('../routes/routerUsers'));
app.use(require('../routes/routerNotes'));
app.use(require('../routes/routerAreas'));
app.use(require('../routes/routerInforme'));
app.use(require('../routes/routerConfig'));

//statis files
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;