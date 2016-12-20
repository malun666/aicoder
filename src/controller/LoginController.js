
const User = require('../datamodel/user');
const passport = require('passport');

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
    cosole.log(user);
    res.redirect('/Login');
  });
  /**
   * get  /login 登录处理 
   */
  app.get('/Login', function (req, res, next) {
    res.render('admin/login', {last: req.query.last} );
  });

  /**
   * post /login  登录提交验证
   */
  // app.post('/login', passport.authenticate('local',
  //   {
  //     successRedirect: '/admin/#/index',
  //     failureRedirect: '/login',
  //     failureFlash: true
  //   }), function (req, res, next) {
  //     res.redirect('/admin/#/index');
  //   });
  app.post('/login', passport.authenticate('local'), function (req, res, next) {
    if (req.query.last) {
      res.redirect(req.query.last);
    } else {
      res.redirect('/admin/#/index');
    }
  });
}

module.exports = LoginController;
