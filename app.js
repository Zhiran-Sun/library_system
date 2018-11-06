var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const books = require('./routes/books');
const students = require('./routes/students');
const records = require('./routes/borrow_record');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//book routes
app.get('/books', books.findAll);
app.get('/books/:id', books.findOne);
app.get('/books/:name/byName', books.findByName);
app.get('/books/:press/byPress', books.findByPress);
app.post('/books', books.addBook);
app.delete('/books/:id', books.deleteBook);
app.get('/books/borrow/see', books.findAllBorrowed);
app.get('/books/borrow/count', books.getBorrowedNumber);
app.get('/books/inlib/see', books.findAllInLibrary);
app.get('/books/inlib/count', books.getInLibraryNumber);

//student routes
app.get('/students', students.findAll);
app.get('/students/:id', students.findOne);
app.get('/students/:name/byName', students.findByName);
app.get('/students/:number/byStuNum', students.findByStuNum);
app.post('/students', students.addStudent);
app.delete('/students/:id', students.deleteStudent);

//borrow record routes
app.get('/records', records.findAll);
app.get('/records/:id', records.findOne);
app.post('/records', records.borrowBook);
app.put('/records/:id/return', records.returnBook);
app.delete('/records/:id', records.deleteRecord);
app.get('/records/count/totalRecords', records.countRecord);

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
