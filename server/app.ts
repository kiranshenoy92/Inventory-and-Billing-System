/// <reference path="../typings/index.d.ts" />
import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
var fs          = require('fs');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
//var User        = require('./models/user'); // get the mongoose model
//var jwt         = require('jwt-simple');


import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";

const app: express.Application = express();






// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());


// demo Route (GET http://localhost:8080)
app.get('/test', function(req, res) {
             var path=__dirname+'/Receipts/output.pdf';

            console.log(path)
            //res.download(path);
            fs.readFile(path, function(err,data){
              res.contentType("application/pdf");
              res.send(data);
            })
});


app.get('/receipt/:receiptNumber', function(req, res) {
            
             var path=__dirname+'/Receipts/'+req.params.receiptNumber+'.pdf';

            console.log(path)
            //res.download(path);
            fs.readFile(path, function(err,data){
              res.contentType("application/pdf");
              res.send(data);
            })
});



app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));
app.use(express.static(__dirname));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// api routes

app.use("/api", protectedRouter);
app.use("/auth", loginRouter);

app.use('/client', express.static(join(__dirname, '../client')));
app.use('/pdf', express.static(join(__dirname, '../public')));
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
