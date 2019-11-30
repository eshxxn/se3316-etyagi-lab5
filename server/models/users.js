const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    max: 30
  },
  password: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
    max:5,
    min:5
  },
  authenticated: {
    type: Boolean,

  },
});

// Export the song model
module.exports = mongoose.model('myUser', UserSchema);
