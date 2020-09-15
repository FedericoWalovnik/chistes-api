const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Categoria = mongoose.model('Categoria', CategoriaSchema);
