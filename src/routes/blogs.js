var express = require( 'express' );
var blogscontroller = require( '../controller/blogsController' )
var blogs = express.Router();

/* GET home page. 
 * get /blogs/add
 */
blogs.get( '/add', function( req, res, next ) {
  res.render( 'blogs/add', {
    title: '添加blog文章'
  } );
} );

blogs.post( '/add', blogscontroller.add );

/*
 * 删除博客的功能页面
 * get  /blogs/del/4
 */
blogs.get( '/del/:id',blogscontroller.blog_show_del);

/**
 * 删除博客的功能页面
 * get  /blogs/del/4
 */
blogs.post( '/del/:id',blogscontroller.blog_del);


/**
 * 浏览博客的功能页面
 * get  /blogs/4
 */
blogs.get('/:id', blogscontroller.blog_detail);

/**
 * 修改博客的功能
 * get /blogs/edit/:id
 */
blogs.get('/edit/:id', blogscontroller.blog_show_edit);

/**
 * 修改博客的功能页面
 *  post /blogs/edit/4
 */
blogs.post( '/edit/:id',blogscontroller.blog_edit);


module.exports = blogs;
