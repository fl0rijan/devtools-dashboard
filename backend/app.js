require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRoutes');
var snippetRouter = require('./routes/SnippetRoutes');
var promptRouter = require('./routes/PromptRoutes');
var bookmarkRouter = require('./routes/BookmarkRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: mongoDB}),
    cookie: {
        // secure: process.env.NODE_ENV === "production", // Use true if served over HTTPS
        // sameSite: 'lax' // 'lax' is a good default, 'none' if cross-site with secure:true
    }
}));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/prompts', promptRouter);
app.use('/bookmarks', bookmarkRouter);
app.use('/snippets', snippetRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
