const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  apellido: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  contraseña: {
    type: String,
    trim: true,
    required: true,
  },
});
const Usuario = model("Usuario", usuarioSchema);

module.exports = Usuario;
