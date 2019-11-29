const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 30
  },
  artist: {
    type: String,
    required: true,
    max: 30
  },
  album: {
    type: String,
    required: true,
    max: 30
  },
  year: {
    type: Number,
    required: true,
    max: 2020
  },
  genre: {
    type: String,
    required: true,
    max: 30
  },

  rating: {
    type: Number,
    max: 5,
    min: 1
  },
});

// Export the song model
module.exports = mongoose.model('Song', SongSchema);
