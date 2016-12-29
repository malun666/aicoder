
const User = require('../datamodel/user');
const session = require('express-session');

var AdminController = {};

// 注册路由信息
AdminController.registRouter = function (app) {
  /**
   * 后台  get  /admin/index.html
   */
  // app.get('/admin/index.html', function (req, res, next) {
  //   console.log(req.session.passport.user);

  //   res.render('admin/index', req.session.passport.user);
  // });

  /**
   * 进入后台
   * get /admin
   */
  // app.get('/admin/', function (req, res, next) {
  //   console.log(req.session.passport.user);
  //   res.render('admin/index', req.session.passport.user);
  // });

  app.get('/admin/menuList', function (req, res, next) {
    var userId = req.session.passport.user._id;
    res.json([
      {
        name: '博客管理',
        url: '/index',
        order: 1
      },
      {
        name: '用户管理',
        url: '/userinfo/' + userId,
        order: 2
      }
    ]);
  });

  app.get('/admin/main', function (req, res, next) {
    res.redirect('/admin/index.html');
  });
}

module.exports = AdminController;
