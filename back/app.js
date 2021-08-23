require('dotenv').config();
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


const corsOptions = {
  credentials: true,
}

const session = require('express-session');
const MongoStore = require('connect-mongo');
const indexRouter = require('./routes/index');

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// var allowedOrigins = ['http://localhost:3000',
//                       'https://localhost:3000',
//                       'http://185.98.137.145',
//                       'https://185.98.137.145',
//                       'http://www.1shot.fr',
//                       'https://www.1shot.fr',
//                       'http://1shot.fr',
//                       'https://1shot.fr',
//                     ];

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if(!origin)
//       return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//           'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(cors(corsOptions));

app.use(helmet());
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//cookie cookie
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret : "Bonjour ici le cookie à votre dispo",
  resave : false,
  saveUninitialized : false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
  }),
  cookie: {
    maxAge : oneDay,
    secure: false,
    httpOnly : false,}
  }
));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('HERE');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
