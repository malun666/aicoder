const express = require('express');
const blogRoute = express.Router();

const Blog = require('../datamodel/blog');
const Tag = require('../datamodel/tag');
const logger = require('../common/log');
const mongoose = require('mongoose');
const htmlparserHelper = require('../common/htmlparserhelp');

var BlogController = {};

// 设置路由信息
BlogController.registRouter = function (app) {
  blogRoute.get('/add.html', function (req, res, next) {
    res.render('blogs/add', {
      title: '添加blog文章'
    });
  });

  blogRoute.post('/add', BlogController.add);

  /*
   * 删除博客的功能页面
   * get  /blogs/del/4
   */
  blogRoute.get('/del/:id.html', BlogController.blog_show_del);

  /**
   * 删除博客的功能页面
   * get  /blogs/del/4
   */
  blogRoute.post('/del/:id', BlogController.blog_del);

  /**
   * 浏览博客的功能页面
   * get  /blogs/4
   */
  blogRoute.get('/:id.html', BlogController.blog_detail);

  /**
   * 修改博客的功能
   * get /blogs/edit/:id
   */
  blogRoute.get('/edit/:id.html', BlogController.blog_show_edit);

  /**
   * 修改博客的功能页面
   *  post /blogs/edit/4
   */
  blogRoute.post('/edit/:id', BlogController.blog_edit);
  blogRoute.get('/index.html', BlogController.index);

  blogRoute.get('/*', BlogController.index)
  // 所有未匹配的走当前首页

  app.use('/blogs/', blogRoute);

};

/*================================
=            添加blog信息            =
================================*/
BlogController.add = function blogs_add(req, res, next) {
  // res.json(req.body);
  //从请求中拿到所有到post来的数据，创建一个model对象。
  var blog = new Blog();
  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.author = req.body.author;

  var tagsStr = req.body.tag;// 拿到所有的tag标签： 老师,go，老大，model,sdcard"

  // 拿到所有tag标签对应的 tag字符串数组
  var tagArray = tagsStr.replace(/，/g, ',').split(',');

  // 保存数据到mongodb中
  blog.save(function (error, item) {
    if (error) {
      logger.log(error);
      return;
    }
    //添加tag到MongoDb中去
    tagArray.forEach(function (item) {
      try {
        var tag = new Tag();
        tag.name = item;
        tag.save();
      } catch (ex) {
        logger.log(ex);
      }
    });
    //添加成功后跳转到首页
    res.redirect('/');
  });
};


/*============================
=            博客列表            =
============================*/
BlogController.index = function blogs_index(req, res, next) {
  //通过MongoDb搜索
  Blog.where({ deleted: false }).find().limit(20).sort({ 'create_at': -1 }).exec(function (error, blogs) {
    if (error) {
      logger.log(error);
      return;
    }

    //截取content中的内容字，显示简介。
    blogs.forEach(function (e, i) {
      blogs[i].content = htmlparserHelper.paserHtml(e.content).slice(0, 50);
    });


    //查询所有的 最新的文章
    Blog.where({ deleted: false }).find().sort({ 'visit_count': -1 }).limit(10).exec(function (error, cursor) {
      if (error) {
        logger.log(error);
        return;
      }
      res.render('index', {
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
BlogController.blog_detail = function (req, res, error) {
  Blog.where({ '_id': req.params.id }).findOne(function (error, blog) {
    if (error || !blog) {
      logger.log(error);
      res.redirect('/');
      return;
    }
    blog.visit_count += 1;
    blog.save();
    Blog.where({ deleted: false }).find().sort({ 'visit_count': -1 }).limit(10).exec(function (error, cursor) {
      if (error) {
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
BlogController.blog_del = function (req, res, error) {
  Blog.where({ '_id': req.params.id }).findOne(function (error, blog) {
    if (error || !blog) {
      logger.log(error);
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
BlogController.blog_show_del = function (req, res, error) {
  Blog.where({ '_id': req.params.id }).findOne(function (error, blog) {
    if (error || !blog) {
      logger.log(error);
      res.redirect('/');
      return;
    }

    res.render('blogs/blog_del_detail', blog);
  });
};

/*================================
=            显示单个修改博客页面            =
================================*/
BlogController.blog_show_edit = function (req, res, error) {
  Blog.where({ '_id': req.params.id }).findOne(function (error, blog) {
    if (error || !blog) {
      logger.log(error);
      res.redirect('/');
      return;
    }

    res.render('blogs/edit', blog);
  });
};

BlogController.blog_edit = function (req, res, error) {
  Blog.where({ '_id': req.params.id }).findOne(function (error, blog) {
    if (error || !blog) {
      logger.log(error);
      res.redirect('/');
      return;
    }
    // blog.deleted = true;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.author = req.body.author;
    blog.save();

    res.redirect('/');
  });
};

module.exports = BlogController;
