const express = require("express");
const router = express.Router();

router.get("/usuarios", (req, res) => {
  res.status(200).json({ message: "GET /usuarios" });
});

module.exports = router;
