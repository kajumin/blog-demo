var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var mysql = require('mysql');
var conn = require('../database/database.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var page = req.query.page || 1;
	var limit = 8;
	var offset = (page-1) * limit;
	var sqlcount = 'select count(1) as articleNum from article';
	var sql = 'select * from article order by articleTime DESC limit ' + offset + ", "+ limit;
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err);
		}
		// console.log(rows)
		var articles = rows;
		articles.forEach(function(ele){
			var year = ele.articleTime.getFullYear();
			var month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() + 1 : '0' + (ele.articleTime.getMonth() + 1);
			var date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
			ele.articleTime = year + '-' + month + '-' + date;
		});
		conn.query(sqlcount, function(err, rows, feilds) {
			var articleNum = rows[0].articleNum;
			var pageNum = Math.ceil(articleNum / limit);
			res.render('index',{ articles: articles,user:req.session.user,pageNum:pageNum,page:page});
		})
		
	});
});


router.get('/friends', function(req, res, next) {
  	res.render('friends',{user: req.session.user});
});
router.get('/about', function(req, res, next) {
  	res.render('about',{user: req.session.user});
});
router.get('/logout', function(req, res, next) {
  	req.session.user = null;
  	res.redirect('/');
});

router.get('/login', function(req, res, next) {
  	res.render('login',{ message: ''});
});
router.post('/login', function(req, res, next) {
 	
 	var name = req.body.name;
 	var password = req.body.password;
 	var hash = crypto.createHash('md5');
 	hash.update(password);

 	password = hash.digest('hex');
 	var sql = 'select * from author where authorName = ' + mysql.escape(name) + 'and authorPassword = ' + mysql.escape(password);
 	conn.query(sql, function(err, rows, feilds) {
 		if(err) {
 			console.log(err);
 			return;
 		}
 		var user = rows[0];
 		if(!user) {
 			res.render('login',{ message: '用户名或者密码错误!'});
 			return;
 		}

 		// req.session.userSign = true;
 		req.session.user = user;
 			res.redirect('/');
 	});
});

module.exports = router;
