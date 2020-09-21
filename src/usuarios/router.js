const express = require('express');
const Usuario = require('./Usuario');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const usuario = await Usuario.findById(_id);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const usuario = new Usuario(data);

    const token = await usuario.generarAuthToken();

    //encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);

    await usuario.save();

    res.status(201).send({ usuario, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findByCredentials(
      req.body.email,
      req.body.contraseña
    );
    const token = await usuario.generarAuthToken();
    res.send({ usuario, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ mensaje: 'email o contraseña incorrecta' });
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.usuario.tokens = req.usuario.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.usuario.save();

    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    console.log(req.usuario.tokens);
    req.usuario.tokens = [];
    await req.usuario.save();
    console.log(req.usuario.tokens);
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

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
    res.status(500).send(e.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(_id);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
