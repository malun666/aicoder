const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function registRouter(app) {
  var p = path.join(__dirname, '../controller');
  // 操作步骤：
  //    1、 加载所有的controller，并默认注册控制器的所有的action
  fs.readdirSync(p).forEach(function (file) {
  //    2、 判断是否是 controller文件，如果是那么进行处理  
    if (file.substr(-3) == '.js') {
      var controller = require('../controller/' + file);
  //    3、 把Controller注册到 app中去
      controller.registRouter(app);
    }
  });
}

module.exports = registRouter;
