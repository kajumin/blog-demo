var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var conn = require('../database/database.js');
var router = express.Router();
console.log('写文章')

router.get('/article-edit',function(req, res, next) {

	if(!req.session.user){
		res.redirect('/login');
		return;
	}

	res.render('edit', {user: req.session.user});
});
router.post('/edit',function(req, res, next) {

	var title = req.body.title;
	var content = req.body.content;
	// var author = 'node';
	var author = req.session.user.authorName;
	// console.log(req.session.user)
	var sql = 'insert article set articleTitle = ' + 
	conn.escape(title) + ',articleAuthor = ' + 
	conn.escape(author) + ',articleContent = ' + 
	conn.escape(content) + ',articleTime = NOW()';  
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err)
			return;
		}
		res.redirect('/');
	})
});
router.get('/modify/:articleID', function(req, res, next) {
	var user = req.session.user;
	if(!user) {
		res.redirect('/login');
		return;
	}
	var articleID = req.params.articleID;
	var sql = 'select * from article where articleID = ' + conn.escape(articleID) + 'limit 1';
	
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err);
			return;
		}
		var article = rows[0];
		// var title = article.articleTitle;
		// var content = articleContent;
		// console.log(title,content);
		res.render('modify', { user: user,article:article});
	})
})
router.post('/modify/:articleID', function(req, res, next) {
	var user = req.session.user;
	if(!user) {
		res.redirect('/login');
		return;
	}
	// console.log(req.body)
	var articleID = req.params.articleID;
	var title = req.body['title'];
	var content = req.body['content'];
	var sql = 'update article set articleTitle = ' + 
	conn.escape(title) + ',articleContent = ' + 
	conn.escape(content) + 'where articleID = ' + 
	conn.escape(articleID); 
	// console.log(sql);
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err);
			return;
		}
		res.redirect('/');
	})
});
router.get('/delete/:articleID', function(req, res, next) {
	var user = req.session.user;
	if(!user) {
		res.redirect('/login');
		return;
	}
	var articleID = req.params.articleID;
	var sql = 'delete from article where articleID ='+ conn.escape(articleID); 
	// console.log(sql);
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err);
			return;
		}
		res.redirect('/');
	})
});

router.get('/:articleID', function(req, res, next) {
	var articleID = req.params.articleID;
	var sql = 'select * from article where articleID = ' + conn.escape(articleID);
	conn.query(sql, function(err, rows, feilds) {
		if(err) {
			console.log(err);
			return;
		}
		var article = rows[0];
		var sql = 'update article set articleClick = articleClick + 1 where articleID = ' + conn.escape(articleID);
		conn.query(sql, function(err, rows, feilds) {
			if(err) {
				console.log(err)
				return;
			}
			console.log(article);
			var year = article.articleTime.getFullYear();
			var month = article.articleTime.getMonth() + 1 > 10 ? article.articleTime.getMonth() + 1 : '0' + (article.articleTime.getMonth() + 1);
			var date = article.articleTime.getDate() > 10 ? article.articleTime.getDate() : '0' + article.articleTime.getDate();
			article.articleTime = year + '-' + month + '-' + date;

			res.render('article', {article: article, user: req.session.user});
		});
		
	});
});


module.exports = router;