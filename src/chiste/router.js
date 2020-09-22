const express = require('express');
const router = express.Router();
const Chiste = require('./Chiste');
const Categoria = require('../categoria/Categoria');
const auth = require('../middleware/auth');

//crear chiste
router.post('/', auth, async (req, res) => {
  const chiste = new Chiste(req.body);

  const categoria = await Categoria.findById(chiste.category);
  if (categoria === undefined || categoria === null) {
    res.status(400).json({ mensaje: 'Ingrese una categoria valida' });
  }

  try {
    await chiste.save();
    res.status(201).send(chiste);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//obtener todos los chistes
router.get('/', auth, async (req, res) => {
  try {
    const chistes = await Chiste.find().sort({ date: -1 }).populate('category');
    res.status(200).json(chistes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//obtener un chiste por su id
router.get('/:id', auth, async (req, res) => {
  try {
    const chiste = await Chiste.findById(req.params.id);
    if (chiste === null) {
      res
        .status(401)
        .json({ mensaje: 'El chiste que esta buscando no existe' });
    }
    res.status(200).json(chiste);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//eliminar un chiste por su id
router.delete('/:id', auth, async (req, res) => {
  try {
    const chisteEliminado = await Chiste.findByIdAndDelete(req.params.id);
    res.status(200).json(chisteEliminado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;
