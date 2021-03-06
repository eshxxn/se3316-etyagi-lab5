const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/songs.controller.js');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', controller.test);
//song routes
router.post('/create', controller.song_create); //create new item OKKKK
router.get('/all', controller.song_getAll); //read all items !!!
router.get('/:id', controller.song_details); //read item  !!!
router.put('/:id', controller.song_update); //update existing item OKKK
router.delete('/:id', controller.song_delete); //delete item from database OKKK
module.exports = router;
