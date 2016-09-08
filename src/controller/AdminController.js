
const User = require('../datamodel/user');

var AdminController = {};

// 注册路由信息
AdminController.registRouter = function (app) {
  /**
   * 注册  get  /admin/index.html
   */
  app.get('/admin/index.html', function (req, res, next) {
    res.render('admin/index');
  });

  /**
   * 进入后台
   * get /admin
   */
  app.get('/admin/', function (req, res, next) {
    res.render('admin/index');
  });
 }

module.exports = AdminController;
