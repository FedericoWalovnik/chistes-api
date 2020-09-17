const moongose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await moongose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log('Database connected...');
  } catch (error) {
    console.error(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
