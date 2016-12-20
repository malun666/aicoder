const User = require('../datamodel/user');
const session = require('express-session');

var UserInfoApiController = {};

// 注册路由信息
UserInfoApiController.registRouter = function (app) {
  app.get('/api/menuList', function (req, res, next) {
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

  app.get('/api/getuserbyid/:id', function (req, res, next) {
    var userId = req.params.id;
    User.findOne({'_id': userId},function (error, user) {
      res.json(user);
    });
  });
}

module.exports = UserInfoApiController;
