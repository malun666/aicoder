var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var cofig = require( './config' );
var ueditor = require( 'ueditor' );

var indexs = require( './routes/index' );
var users = require( './routes/users' );
var blogs = require( './routes/blogs' );
var ueditorRouter = require( './routes/ueditor' );

var preStart = require( './appstart' );
preStart();


var app = express();


// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'xtpl' );

// uncomment after placing your favicon in /public
app.use( favicon( path.join( __dirname, 'www', 'favicon.ico' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'www' ) ) );

app.use( '/', indexs );
app.use( '/blogs', blogs );
app.use( '/users', users );
app.use( '/ueditor', ueditorRouter );

// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
// 官方例子是这样的 serverUrl: URL + "php/controller.php"
// 我们要把它改成 serverUrl: URL + 'ue'
// error handlers
app.use( "/lib/ueditor/ue", ueditor( path.join( __dirname, 'www' ), function( req, res, next ) {
  console.log('----'+ req.query.action);
  // ueditor 客户发起上传图片请求
  if ( req.query.action === 'uploadimage' ) {
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/imgs/ueditor/';
    res.ue_up( img_url ); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if ( req.query.action === 'listimage' ) {
    var dir_url = '/imgs/ueditor/';
    res.ue_list( dir_url ); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    res.setHeader( 'Content-Type', 'application/json' );
    res.redirect( '/lib/ueditor/nodejs/config.json' );
  }
} ) );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );



// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.send( err.message );
  } );
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  } );
} );

module.exports = app;
