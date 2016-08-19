const BlogsController = require('./BlogsController');
var HomeController = {};

// 注册路由信息
HomeController.registRouter = function (app) {
  /**
   * /about
   */
  app.get('/about', function (req, res, next) {
    res.render('about', {});
  });

  /**
   * get /chance
   */
  app.get('/chance', function (req, res, next) {
    res.render('about', {});
  });
 
  app.get('/*', BlogsController.index);
}
module.exports = HomeController;
