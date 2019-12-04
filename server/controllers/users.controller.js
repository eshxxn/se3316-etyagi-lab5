var express = require('express')
var router = express.Router();
const User = require('../models/users.js');
const Token = require('../models/tokens.js');
const mongo = require("mongoose");
const bcrypt = require("bcryptjs");
var randomToken = require("randomstring");
var crypto = require('crypto');
var nodemailer = require('nodemailer');

//User login controller--------------------------------------------------
exports.user_register = function(req,res){
  const token = randomToken.generate();
  bcrypt.hash(req.body.password,10, function(err,hash){
  var username = req.body.username;
  var password = hash;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.authenticated = false;
  newuser.token = token;

  // Create a verification token for this user

       newuser.save(function(err, savedUser){
         if(err){
           console.log(err);
           return res.status(500).send();
         }
         var token = new Token({ _userId: newuser._id, token: crypto.randomBytes(16).toString('hex') });
       // Save the verification token
       token.save(function (err) {
           if (err) { return res.status(500).send({ msg: err.message }); }

           // Send the email
           var transporter = nodemailer.createTransport({ host:'smtp.live.com',port:465,secure:true,service: 'hotmail', auth: { user: "eshaan98@hotmail.com", pass: "eshaan24" } });
           var mailOptions = { from: 'eshaan98@hotmail.com', to: newuser.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
           transporter.sendMail(mailOptions, function (err) {
               if (err) { return res.status(500).send({ msg: err.message }); }
               res.status(200).send('A verification email has been sent to ' + newuser.email + '.');
             });
  });


  })
});
}

exports.user_login = function(req,res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send();

    }
    // try{
    //   bcrypt.verify(user.password, password).then(success => {
    //     if(success){
    //       console.log("Working");
    //       return res.status(200).send();
    //     }
    //   })
    // }
    // catch{
    //   console.log("404");
    //   return res.status(404).send();
    // }
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
