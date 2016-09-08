<<<<<<< HEAD
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
=======
const express = require('express');
const commentRoute = express.Router();

var CommentController = {};
/**
 * 查询文章的评论列表
 */
CommentController.Index = function( req, res, next ) {
  // 查出所有的用户的数据来
};

/*
 * 注册路由信息
 */
CommentController.registRouter = function (app) {

  /**
   * 
   */
  commentRoute.get('/index/:id.html', CommentController.Index);


  app.use('/comment/', commentRoute);
}
>>>>>>> 124e46062b19adaf638c8b3a36678aa7cd09e4c3
module.exports = CommentController;
