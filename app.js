var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articleRouter');

var app = express();

var favicon = require('serve-favicon');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 日志
var logger = require('morgan');
// 日志分隔
var FileStreamRotator = require('file-stream-rotator');


app.use(session({
	secret: 'blog',
	cookie: { maxAge: 1000*60*10 },
	resave: false,
	saveUninitialized: true
}));
// 视图所在位置
app.set('views', path.join(__dirname, 'views'));
// 设置项目中使用的模板引擎
app.set('view engine', 'ejs');

// 日志中间件
app.use(logger('dev'));  //打印到控制台 

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLog = fs.createWriteStream(logDirectory, {flags : 'a'}); 
var accessLogStream = FileStreamRotator.getStream({
 	date_format: 'YYYYMMDD',
 	filename: path.join(logDirectory, 'access-%DATE%.log'),
 	frequency: 'daily',
 	verbose: false
}) 
// short  combined
app.use(logger('short', {stream : accessLogStream}));      //打印到log日志 
// var errorLog = fs.createWriteStream(path.join(__dirname, 'bin/error.log'), {flags : 'a'});

// bodyParser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// express自带
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// 使用cookieParser中间件
app.use(cookieParser());
// 静态资源的路径
// console.log(path.join(__dirname, 'public','./css'));
app.use(express.static(path.join(__dirname, 'public')));
// 使用路径
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/article', articleRouter);

// 处理404错误
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	
	// var err = new Error('Not Found');
	// err.status = 404
 	//    next(err);
 	res.render('404');
});

// 错误处理
// app.use(function(err, req, res, next) {
//   // 设置本地错误信息仅在开发环境中提供
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // 渲染错误请求页面
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000, function(){
	console.log('listening port 3000');
});

module.exports = app;
