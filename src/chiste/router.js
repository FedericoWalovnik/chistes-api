const express = require('express');
const router = express.Router();
const Chiste = require('./Chiste');

router.post('/chistes', async (req, res) => {
  const chiste = new Chiste(req.body);
  console.log(chiste);
  try {
    await chiste.save();
    res.status(201).send(chiste);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/chistes', async (req, res) => {
  try {
    const chistes = await Chiste.find().sort({ date: -1 });
    res.status(200).json(chistes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/chistes/:id', async (req, res) => {
  try {
    const chiste = await Chiste.findById(req.params.id);
    res.status(200).json(chiste);
  } catch (error) {
    res.status(500).send('Server error');
  }
  res.status(200).send({ message: 'GET /chistes' });
});

router.delete('/chistes/:id', async (req, res) => {
  try {
    const chisteDeleted = await Chiste.findByIdAndDelete(req.params.id);
    res.status(200).json(chisteDeleted);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
