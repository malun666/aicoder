var TagController = {};
TagController.registRouter = function (app) {
  /**
   * /about
   */
 
  app.get('/Tag/*', (req, res, next)=>{
    res.send('tag index action');
  });
}

module.exports = TagController;
