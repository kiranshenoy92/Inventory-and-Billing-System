import { Router, Request, Response, NextFunction } from "express";
var bCrypto = require('bcrypt-nodejs');
var jwt         = require('jwt-simple');

var config      = require('../config/database'); // get db config file
var User        = require('../models/user'); // get the mongoose model

const loginRouter: Router = Router();


 var createHash = function(password){
        return bCrypto.hashSync(password, bCrypto.genSaltSync(10), null);
    };



// route to authenticate a user (POST http://localhost:8080/api/authenticate)
loginRouter.post('/login', function(req, res) {
  User.findOne({
    name: req.body.username
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
        
           res.json({success: true,  user ,token: 'JWT ' + token});
        
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


export { loginRouter }
