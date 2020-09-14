const mongoose = require('mongoose');

const ChistesSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  joke: {
    type: String,
    required: true
  }
});

module.exports = Chistes = mongoose.model('chistes', ChistesSchema);
