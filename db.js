const { MongoClient, ObjectId  } = require('mongodb');

// url of the mongo db 
const remoteUrl = 'mongodb+srv://rukunddiacre:fB05PLQs0GzAqdHP@cluster0.xwplm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'invetoryDB'; //Database name
let db;

// connect to mongodb
const connectToMongo = async () => {
    const client = new MongoClient(remoteUrl, {});
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  db = client.db(dbName);
};

// check for the result of connection

const getDb = () => {
  if (!db) {
    throw new Error('Database not connected!');
  }
  return db;
};

// export connection

module.exports = { connectToMongo, getDb };