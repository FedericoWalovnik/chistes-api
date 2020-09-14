const express = require('express');
const router = express.Router();

router.get('/chistes', (req, res) => {
  res.status(200).send({ message: 'GET /chistes' });
});

module.exports = router;
