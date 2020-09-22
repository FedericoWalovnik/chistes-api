const express = require('express');
const Usuario = require('./Usuario');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { findById } = require('./Usuario');

//obtener todos los usuarios
router.get('/', auth, async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('chistes');
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//obtener usuario por su id
router.get('/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const usuario = await Usuario.findById(_id).populate('chistes');
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//agregar usuario
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const usuario = new Usuario(data);

    const usuarioRepetido = await Usuario.findOne({
      email: usuario.email
    }).exec();

    if (usuarioRepetido) {
      res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const token = await usuario.generarAuthToken();

    //encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);

    await usuario.save();

    res.status(201).send({ usuario, token });
  } catch (e) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//login usuario
router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findByCredentials(
      req.body.email,
      req.body.contraseña
    );
    const token = await usuario.generarAuthToken();
    res.send({ usuario, token });
  } catch (err) {
    res.status(400).json({ mensaje: 'email o contraseña incorrecta' });
  }
});

//logout usuario
router.post('/logout', auth, async (req, res) => {
  try {
    req.usuario.tokens = req.usuario.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.usuario.save();

    res.send();
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//logout de todas las cuentas activas del usuario
router.post('/logoutAll', auth, async (req, res) => {
  try {
    console.log(req.usuario.tokens);
    req.usuario.tokens = [];
    await req.usuario.save();
    console.log(req.usuario.tokens);
    res.send();
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//agregar chiste a favoritos
router.post('/agregarchiste/:idchiste', auth, async (req, res) => {
  try {
    const _id = req.params.idchiste;

    console.log(req.usuario.chistes.indexOf(_id));
    if (req.usuario.chistes.indexOf(_id) >= 0) {
      res.status(400).send({ mensaje: 'El chiste ya esta en favoritos' });
    }

    req.usuario.chistes.push(_id);
    const chistes = req.usuario.chistes;

    await req.usuario.save();
    res.status(200).json(chistes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//modificar datos usuario
router.put('/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const usuario = await User.findById(_id);
    for (key in data) {
      if (key !== '_id') {
        usuario[key] = data[key];
      }
    }
    res.status(200).json(await usuario.save());
  } catch (e) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//eliminar usuario
router.delete('/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(_id);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;
