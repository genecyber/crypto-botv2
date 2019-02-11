var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var monkey = require('./services/monkey')
var database = require('./services/database')
var feed = require('./services/feed')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.resolve('..', 'app'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var Feed = new feed(database, ()=>{
  var toClean = database.unCleaned()
  monkey.cleanHtml(toClean, (err, cleaned)=>{
    if (!err && toClean.length > 0) {
      database.save(()=>{
        console.log("Html Cleaned")
      })
    }
  })
})