var express = require('express')
var router = express.Router();
const Review = require('../models/review.js');
const mongo = require("mongoose");
//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send('Greetings from the Test controller!');
};

//SONGS CONTROLLERS-------------------------------------------------------------

// controllers/products.js
exports.review_create = function(req, res, next) {
  let review = new Review({
    username: req.body.username,
    rating: req.body.rating,
    songname: req.body.songname,
    comment: req.body.comment,
  });

  review.save(function(err, review) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Review Created.',
      review
    });
  })
};

exports.review_details = function(req, res, next) {
  Review.findById(req.params.id, function(err, review) {
    if (err) return next(err);
    res.json({
      review
    });
  })
};

exports.review_update = async function(req, res, next) {
  try {
    var review = await Review.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err, review) {
      if (err) return next(err);
    });
    return res.json({
      message: 'Review Updated.',
      review
    });
  } catch (err) {
    return next(err)
  }

};

exports.review_delete = function(req, res, next) {
  Review.findByIdAndRemove(req.params.id, function(err, review) {
    if (err) return next(err);
    res.json({
      message: 'Review Deleted.',
      review
    });
  })
};

exports.review_getAll = function(req, res, next) {
  Review.find((err, items) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    return res.json({
      items
    });
  });
}
