/**
 * app 启动时执行的 技术文件
 */

const mongoose = require( 'mongoose' );
const config = require( './config' );

module.exports = function() {
  console.log( 'connect mgd...' );

  /*=================================
  =            链接mongodb            =
  =================================*/
  mongoose.connect( config.mongodbConStr, {
    server: {
      poolSize: 20
    }
  }, function( err ) {
    if ( err ) {
      console.log( '链接 mongodb 失败，程序退出 ,by ' + config.mongodbConStr );
      process.exit( 1 );
    } else {
      console.log( 'connected mongodb' );
    }
  } );
  /*=====  End of 链接mongodb  ======*/

  /**
   * 身份登录验证处理
   */
};
