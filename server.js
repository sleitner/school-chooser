// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    request = require('request'), //Simple HTTP requests
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.post('/api/dcgis', function(req,res) {
    var url = 'http://dcatlas.dcgis.dc.gov/wsProxy/proxy_LocVerifier.asmx/findLocation_all',
        str = req.body.address;
    request.post(url, {form: {str: str}}).pipe(res);
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});