const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    console.log('Fetching contacts from MongoDB');
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    if (!db) {
      throw new Error('Database connection not initialized');
    }
    const contactsId = new ObjectId(req.params.id);
    console.log(`Fetching contact with ID: ${contactsId}`);
    const result = await db.collection('contacts').find({ _id: contactsId });
    const contacts = await result.toArray();
    if (contacts.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (error) {
    console.error('Error fetching contact:', error.message);
    res.status(500).json({ error: 'Failed to fetch contact', details: error.message });
  }
};

module.exports = {
  getAll,
  getSingle
};