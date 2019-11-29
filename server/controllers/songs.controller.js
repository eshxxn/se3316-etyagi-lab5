var express = require('express')
var router = express.Router();
const Song = require('../models/songs.js');
const mongo = require("mongoose");
//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send('Greetings from the Test controller!');
};

//SONGS CONTROLLERS-------------------------------------------------------------

// controllers/products.js
exports.song_create = function(req, res, next) {
  let song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    rating: req.body.rating,
  });

  song.save(function(err, song) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Song Created.',
      song
    });
  })
};

exports.song_details = function(req, res, next) {
  Song.findById(req.params.id, function(err, song) {
    if (err) return next(err);
    res.json({
      song
    });
  })
};

exports.song_update = async function(req, res, next) {
  try {
    var song = await Song.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err, song) {
      if (err) return next(err);
    });
    return res.json({
      message: 'Song Updated.',
      song
    });
  } catch (err) {
    return next(err)
  }


};

exports.song_delete = function(req, res, next) {
  Song.findByIdAndRemove(req.params.id, function(err, song) {
    if (err) return next(err);
    res.json({
      message: 'Song Deleted.',
      song
    });
  })
};

exports.song_getAll = function(req, res, next) {
  Song.find((err, items) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    return res.json({
      items
    });
  });
}
