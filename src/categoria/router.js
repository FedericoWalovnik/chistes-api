const express = require('express');
const router = express.Router();
const Categoria = require('./Categoria');
const Chiste = require('../chiste/Chiste');
const auth = require('../middleware/auth');

//crear categoria
router.post('/', auth, async (req, res) => {
  const categoria = new Categoria(req.body);
  try {
    await categoria.save();
    res.status(201).send(categoria);
  } catch (err) {
    console.log(err);
    res.status(400).send('server error');
  }
});

//obtener todas las categorias
router.get('/', auth, async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ date: -1 });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//obtener una categoria por su id
router.get('/:id', auth, async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (categoria === null) {
      res.status(401).json('No existe');
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

//eliminar una categoria por su id
router.delete('/:id', auth, async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      res.status(401).json({ mensaje: 'No existe la categoria' });
    }
    const chistesCategoriaEliminada = await Chiste.find({
      category: categoriaEliminada
    });
    console.log(chistesCategoriaEliminada);

    chistesCategoriaEliminada.map(async (chiste) => {
      chiste.category = '5f68bc23741f5d64e8e183d4';
      await chiste.save();
    });

    res.status(200).json(categoriaEliminada);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
