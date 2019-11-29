const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/users.controller.js');


router.post('/register', controller.user_register);
router.post('/login', controller.user_login);
router.delete ('/:id', controller.user_delete);

module.exports = router;
