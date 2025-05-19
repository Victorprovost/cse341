const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the CSE341 API');
});

router.use('/contacts', require('./contacts')); // Loads routes/contacts.js

module.exports = router;