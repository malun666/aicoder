const Blog = require( '../datamodel/blog' );
const logger = require( '../common/log' );
const mongoose = require( 'mongoose' );
const htmlparserHelper = require('../common/htmlparserhelp');

/*================================
=            添加blog信息            =
================================*/
exports.add = function blogs_add( req, res, next ) {
  // res.json(req.body);
  //从请求中拿到所有到post来的数据，创建一个model对象。
  var blog = new Blog();
  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.author = req.body.author;

  // 保存数据到mongodb中
  blog.save( function( error, item ) {
    if ( error ) {
      logger.log( error );
      return;
    }
    //添加成功后调整
    res.redirect( '/' );
  } );
};


/*============================
=            博客列表            =
============================*/
exports.index = function blogs_index( req, res, next ) {
  //通过MongoDb搜索
  Blog.where({ deleted: false}).find().limit(20).sort({'create_at': -1 }).exec( function( error, blogs ) {
    if ( error ) {
      logger.log( error );
      return;
    }

    //截取content中的内容字，显示简介。
    blogs.forEach( function( e, i ) {
      blogs[ i ].content = htmlparserHelper.paserHtml(e.content).slice( 0, 50 );
    } );


    //查询所有的 最新的文章
    Blog.find().sort({'create_at': -1}).limit( 10 ).exec(function( error, cursor ) {
      if ( error ) {
        logger.log(error);
        return;
      }
      res.render( 'index', {
        title: "老马的博客-flydragon 低调分享，乐于分享",
        items: blogs,
        top: cursor
      });//res.rendder

    });// Blog sort
    
  });//Blog.find
};


/*================================
=            显示单个博客页面            =
================================*/
exports.blog_detail = function (req, res, error) {
  Blog.where({'_id': req.params.id }).findOne(function (error, blog) {
    if( error || !blog ) {
      logger.log( error );
      res.redirect('/');
      return;
    }

    Blog.find().sort({'create_at': -1}).limit( 10 ).exec(function( error, cursor ) {
      if ( error ) {
        logger.log(error);
        res.redirect('/');
        return;
      }
      blog.top = cursor;
      res.render('blogs/blogdetail', blog);
    });// Blog sort
  });
};


/*================================
=            处理用户删除blog           =
================================*/
exports.blog_del = function (req, res, error) {
  Blog.where({'_id': req.params.id }).findOne(function (error, blog) {
    if( error || !blog ) {
      logger.log( error );
      res.redirect('/');
      return;
    }
    blog.deleted = true;
    blog.save();

    res.redirect('/');
  });
};


/*================================
=            显示单个删除博客页面            =
================================*/
exports.blog_show_del = function (req, res, error) {
  Blog.where({'_id': req.params.id }).findOne(function (error, blog) {
    if( error || !blog ) {
      logger.log( error );
      res.redirect('/');
      return;
    }

    res.render('blogs/blog_del_detail', blog);
  });
};


/*================================
=            显示单个修改博客页面            =
================================*/
exports.blog_show_edit = function (req, res, error) {
  Blog.where({'_id': req.params.id }).findOne(function (error, blog) {
    if( error || !blog ) {
      logger.log( error );
      res.redirect('/');
      return;
    }

    res.render('blogs/edit', blog);
  });
};





