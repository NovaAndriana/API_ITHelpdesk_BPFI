var express = require('express'),
app = express(),
port = process.env.PORT || 5001,
bodyParser = require('body-parser'),
controller = require('./controller');
var http = require('http');
var https = require('https');
var fs = require('fs');
var cors = require('cors');
var path = require("path"); // used for working with url paths
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
const responseEnhancer = require('express-response-formatter')


// Add formatter functions to "res" object via "responseEnhancer()"
app.use(responseEnhancer()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}));

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middlewares
 app.use(function (req, res, next) {
     //Enabling CORS 
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
     //res.removeHeader();
     next();
 });
var routes = require('./routes');
options = {

  pfx: fs.readFileSync("ssl/ssl.pfx"),
  passphrase: "bpfi2018"

};

routes(app);
app.use(express.json({
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',
    verify: undefined
  }));

//app.listen(port);
http.createServer(app).listen(5000)
https.createServer(options, app).listen(port);
console.log('For Secure Access https on port: ' + port);

