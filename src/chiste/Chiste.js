const mongoose = require('mongoose');

const ChistesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'categoria'
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
