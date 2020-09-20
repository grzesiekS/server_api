const express = require('express');
const router = express.Router();
const Seat = require('../models/seats.model');
const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);

router.get('/seats/random', SeatsController.getRandom);

router.get('/seats/:id', SeatsController.getID);

router.post('/seats', SeatsController.postNew);

router.put('/seats/:id', SeatsController.updateOne);

router.delete('/seats/:id', SeatsController.deleteOne);

module.exports = router;