const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const mongodb = require('./data/database'); 
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db('cse341').collection('contacts');
}

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = mongodb.getDatebase().db('cse341');
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = mongodb.getDatebase().db('cse341');
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;