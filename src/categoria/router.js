const express = require('express');
const router = express.Router();
const Categoria = require('./Categoria');

//crear categoria
router.post('/', async (req, res) => {
  const categoria = new Categoria(req.body);
  console.log(categoria);
  try {
    await categoria.save();
    res.status(201).send(categoria);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//obtener todas las categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ date: -1 });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//obtener una categoria por su id
router.get('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    res.status(200).json(categoriaEliminada);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
