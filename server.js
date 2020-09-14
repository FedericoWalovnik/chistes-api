const express = require("express");
const usuarios = require("./src/usuarios/router");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(usuarios);

app.listen(PORT, () => {
  console.log(`Server up and runnig! Listening on port ${PORT}`);
});
