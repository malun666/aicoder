
const User = require('../datamodel/user');
const session = require('express-session');

var AdminController = {};

// 注册路由信息
AdminController.registRouter = function (app) {
  /**
   * 后台  get  /admin/index.html
   */
  app.get('/admin/index.html', function (req, res, next) {
    console.log(req.session.passport.user);
    
    res.render('admin/index', req.session.passport.user);
  });

  /**
   * 进入后台
   * get /admin
   */
  app.get('/admin/', function (req, res, next) {
    console.log(req.session.passport.user);
    res.render('admin/index', req.session.passport.user);
  });
}

module.exports = AdminController;
