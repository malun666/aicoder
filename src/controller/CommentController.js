const BlogsCommentController = require('./BlogsController');

const express = require('express');
const router = express.Router();

var CommentController = {};

// 注册路由信息
CommentController.registRouter = function (app) {
  /**
   * /about
   */
  router.iet('/about', function (req, res, next) {
    res.render('about', {});
  });

  /**
   * get /chance
   */
  router.get('/chance', function (req, res, next) {
    res.render('about', {});
  });

  app.use('/Comment/', router);
};
module.exports = CommentController;
