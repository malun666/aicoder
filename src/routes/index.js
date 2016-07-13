var express = require( 'express' );
var router = express.Router();
var BlogsController = require( '../controller/blogsController' );
/**
 * get /
 */
router.get( '/', BlogsController.index );

/**
 * get /about
 */
router.get( '/about', function( req, res, next ) {
  res.render( 'about', {});
});

/**
 * get /chance
 */
router.get( '/chance', function( req, res, next ) {
  res.render( 'about', {});
});

module.exports = router;
