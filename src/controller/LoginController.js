
const User = require('../datamodel/user');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


var LoginController = {};

// 注册路由信息
LoginController.registRouter = function (app) {
  /**
   * 注册  get  /regist
   */
  app.get('/regist', function (req, res, next) {
    res.render('admin/regist');
  });

  /**
   * 处理用户注册的信息  
   * post /regist   
   * 参数： username  password
   */
  app.post('/regist', function (req, res, next) {
    var user = new User();
    user.Password = req.body.password;
    user.UserName = req.body.username;
    user.save();
    res.redirect('/Login');
  });
  /**
   * get  /login 登录处理 
   */
  app.get('/Login', function (req, res, next) {
    res.render('admin/login');
  });

  /**
   * post /login  登录提交验证
   */
  app.post('/login', function(req, res, next){

  });
}

module.exports = LoginController;
