var express = require('express');
var blogs = express.Router();

/* GET home page. */
blogs.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = blogs;
