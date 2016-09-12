const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cofig = require('./config');
const ueditor = require('ueditor');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// 路由加载器
const routerLoader = require('./routes/routerLoader');

// 用户身份验证
const User = require('./datamodel/user')

// 应用程序启动，只执行一次
const preStart = require('./appstart');
preStart();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');

app.use(flash());
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'www', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
// 启用session
app.use(session({ secret: 'aicoder.com', cookie: { maxAge: 60000 } }));

// 启动passport的验证
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'www')));

// 身份验证处理 --- start
passport.use('local', new LocalStrategy({passReqToCallBack : true},
  function (username, password, done) {
    console.log('login: ' + username + ' ' + password);
    User.findOne({ 'UserName': username }, function (error, user) {
      console.log( 'logon user:' + user);
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: '用户名不存在.' });
      }
      if (user.Password != password ) {
        return done(null, false, { message: '密码不匹配.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {//保存user对象
  done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
  done(null, user);//可以通过数据库方式操作
});
// 身份验证处理 ---end

// 注册所有的路由信息
routerLoader(app);

// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
app.use("/lib/ueditor/ue", ueditor(path.join(__dirname, 'www'), function (req, res, next) {
  console.log('----' + req.query.action);
  // ueditor 客户发起上传图片请求
  if (req.query.action === 'uploadimage') {
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/imgs/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/imgs/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/lib/ueditor/nodejs/config.json');
  }
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect('/404.html');
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
