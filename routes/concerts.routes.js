const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concerts/:id', ConcertController.getID);

router.post('/concerts', ConcertController.postNew);

router.put('/concerts/:id', ConcertController.updateOne);

router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;