var express = require('express')
var router = express.Router();
const User = require('../models/users.js');
const mongo = require("mongoose");
const bcrypt = require("bcryptjs");
var randomToken = required("randomstring");

//User login controller--------------------------------------------------
exports.user_register = function(req,res){
  bcrypt.hash(req.body.password,10, function(err,hash){
  var username = req.body.username;
  var password = hash;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.authenticated = false;

  newuser.save(function(err, savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  })
});
}

exports.user_login = function(req,res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send();

    }
    return res.status(200).send();
  })
}

exports.user_delete = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json({
      message: 'User Deleted.',
      user
    });
  })
};

exports.user_update = async function(req, res, next) {
  try {
    var user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err, user) {
      if (err) return next(err);
    });
    return res.json({
      message: 'User Updated.',
      user
    });
  } catch (err) {
    return next(err)
  }


};
