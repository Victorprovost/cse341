const router = require('express').Router();

router.use('/', require('./swagger')); // Loads routes/swagger.js

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
  res.send('Welcome to the CSE341 API');
});

router.use('/contacts', require('./contacts')); // Loads routes/contacts.js

module.exports = router;