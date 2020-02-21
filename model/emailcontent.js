var mongoose = require('mongoose');

const EmailContentSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model('EmailContent', EmailContentSchema);
