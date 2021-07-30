var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ["set-cookie"],
  SameSite: "Lax",
}
const session = require('express-session');
const { store } = require('./routes/index');
var indexRouter = require('./routes/index');

var app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cookie cookie
app.use(session({
  secret : "Bonjour ici le cookie à votre dispo",
  resave : false,
  saveUninitialized : false,
  store: store,
  cookie: {httpOnly: false, secure: false}
}));

app.use('/', indexRouter);

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
