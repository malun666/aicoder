const BlogsCommentController = require('./BlogsController');

const express = require('express');
const router = express.Router();

var CommentController = {};

// 注册路由信息
CommentController.registRouter = function (app) {
  

  app.use('/Comment/', router);
};
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
module.exports = CommentController;
