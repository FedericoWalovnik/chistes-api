const express = require('express');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const app = express();

//Connect Database
connectDB();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server up and runnig! Listening on port ${PORT}`);
});
