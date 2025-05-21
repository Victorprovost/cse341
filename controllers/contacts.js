const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
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
    //#swagger.tags=['Contacts']
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

const createcontacts = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contacts);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Failed to update contact');
    }
};

const updatecontacts = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactsId = new ObjectId(req.params.id);
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactsId }, contacts);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Failed to update contact');
    }
};


const deletecontacts = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactsId = new ObjectId(req.params.id);
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactsId });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Failed to update contact');
    }
};

module.exports = {
  getAll,
  getSingle,
    createcontacts,
    updatecontacts,
    deletecontacts,
};
