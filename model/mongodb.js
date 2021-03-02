const mongoose = require('mongoose');

// const { MongoClient } = require('mongodb');
require('dotenv').config();
const uriDb = process.env.URI_DB;

// const db = MongoClient.connect(uriDb, {
//   useUnifiedTopology: true,
//   poolSize: 5,
// });

//connect

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//event listeners

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Database connection for db and app was terminated');
  process.exit(1);
});

module.exports = db;
