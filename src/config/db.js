const moongose = require('mongoose');
const db = process.env.MONGO_URI;

//const db ='mongodb+srv://fedeicowalovnik:JUBEvDwblaXwEy1F@chistesdb.xvrq4.mongodb.net/chistesDB?retryWrites=true&w=majority';
console.log(db);

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

/*
const uri =
  'mongodb+srv://fedeicowalovnik:<password>@chistesdb.xvrq4.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});*/

module.exports = connectDB;
