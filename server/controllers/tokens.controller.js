var express = require('express')
var router = express.Router();
const User = require('../models/users.js');
const Token = require('../models/tokens.js');

exports.confirmationPost = function (req, res, next) {
Token.findOne({ token: req.params.id }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
          //  User.findOne({ _id: token._userId}, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });

      })
    };
