var express = require('express');
var router = express.Router();

/**
* get /
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: '老马的博客-flydragon 低调分享，乐于分享' });
});

/**
* get /about
*/
router.get('/about', function (req, res, next) {
  res.render('about', {});
});

module.exports = router;
