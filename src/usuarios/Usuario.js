const { Schema, model } = require('mongoose');
const validator = require('validator');

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true
  },
  apellido: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('El email no es valido');
      }
    }
  },
  contraseña: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('Not the most secure password...');
      }
    }
  },
  chistes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chiste'
    }
  ]
});
const Usuario = model('Usuario', usuarioSchema);

module.exports = Usuario;
