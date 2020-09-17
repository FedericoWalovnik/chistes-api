const { Schema, model } = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  chistes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chiste'
    }
  ]
});

usuarioSchema.methods.generarAuthToken = async function () {
  const usuario = this;
  const payload = {
    user: {
      id: usuario.id
    }
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });

  usuario.tokens = usuario.tokens.concat({ token });
  await usuario.save();

  return token;
};

const Usuario = model('Usuario', usuarioSchema);

module.exports = Usuario;
