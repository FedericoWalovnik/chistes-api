const express = require('express');
const Usuario = require('./Usuario');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(_id);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
