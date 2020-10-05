var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
//var authenticate = require('./authenticate');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require("mongoose");


//const Dishes = require('./models/dishes');

const url = config.mongoUrl;

const connect = mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true });


connect.then((db)=>{

})
.catch((err)=>{
  console.log(err);
})

var app = express();

app.all('*',(req,res,next)=>{
  if(req.secure)
  {
    return next()
  }
  else{
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url)
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('1234'));

// app.use(session({
//   name:'session-id',
//   secret:'1234',
//   store: new FileStore(),
//   saveUninitialized: false,
//   resave:false
// }))

app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// function auth (req, res, next) {
//     console.log(req.session);

//   if(!req.user) {
//       var err = new Error('You are not authenticated!');
//       err.status = 403;
//       return next(err);
//   }
//   else {
//     next();
//   }
// }

//app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("error occured in first function");
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