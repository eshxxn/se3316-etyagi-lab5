const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    max: 30
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1
  },
  songname: {
    type: String,
    required: true
  },
  comment: {
    type: String,

  },
});

// Export the song model
module.exports = mongoose.model('review', ReviewSchema);
