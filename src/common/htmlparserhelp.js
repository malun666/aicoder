var htmlparser = require( 'htmlparser2' );
var htmlparserHelper = {
  paserHtml: function( rawHtml ) {
    var rtext = '';
    
    var parser = new htmlparser.Parser( {
      onopentag: function( name, attribs ) {},
      ontext: function( text ) {
        rtext += text;
      },
      onclosetag: function( tagname ) {}
    }, {
      decodeEntities: true
    } );

    parser.write( rawHtml );
    parser.end();

    return rtext;
  }  //parseHtml
};

module.exports = htmlparserHelper;
