var mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  ip: String,
  country: String,
  state: String,
  city: String,
  name: String,
  visited_on: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('TrackContent', TrackSchema);
