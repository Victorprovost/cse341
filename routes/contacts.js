const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createcontacts);

router.put('/:id', contactsController.updatecontacts);

router.delete('/:id', contactsController.deletecontacts);

module.exports = router;