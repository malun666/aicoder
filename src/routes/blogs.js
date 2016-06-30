var express = require( 'express' );
var blogscontroller = require( '../controller/blogscontroller' )
var blogs = express.Router();

/* GET home page. 
 * get /blogs/add
 */
blogs.get( '/add', function( req, res, next ) {
  res.render( 'blogs/add', {
    title: '添加blog文章'
  } );
} );

blogs.post( '/add', blogscontroller.add );

/**
 * get /blogs/edit/3
 */
blogs.get( '/edit/:id', ( req, res, next ) => {

} );

blogs.get('/:id', blogscontroller.blog_detail);


module.exports = blogs;
