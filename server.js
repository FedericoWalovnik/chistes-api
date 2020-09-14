const express = require("express");
const connectDB = require("./src/config/db");

const usuarios = require("./src/usuarios/router");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use("/usuarios", usuarios);

app.listen(PORT, () => {
  console.log(`Server up and running! Listening on port ${PORT}`);
});
