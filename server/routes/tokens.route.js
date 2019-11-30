const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/tokens.controller.js');

router.get('/confirmation/:id', controller.confirmationPost);

module.exports = router;
