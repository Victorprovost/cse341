const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://provostvictor0:olivetree2060@cluster0.blxj4us.mongodb.net/cse341?retryWrites=true&w=majority';
let db = null;

const intDb = async (callback) => {
  try {
    const client = await MongoClient.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    db = client.db('cse341');
    console.log('Connected to MongoDB');
    callback(null);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    callback(error);
  }
};

const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { intDb, getDatabase };
