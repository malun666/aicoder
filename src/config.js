/*================================
=            app的配置文          =
================================*/

module.exports = {
  isDebug: true, // 配置是否是调试

  // 配置mogondb的链接字符串
  mongodbConStr: "mongodb://localhost:27097/blog_db",

  //网站监听的端口
  webport: 80   // 部署阶段，改回到80
};
