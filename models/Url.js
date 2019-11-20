const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  suffCode: String,
  origUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', urlSchema);