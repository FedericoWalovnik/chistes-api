const mongoose = require('mongoose');

const ChistesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  joke: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chiste = mongoose.model('Chiste', ChistesSchema);
