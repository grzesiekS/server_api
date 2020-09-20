const express = require('express');
const router = express.Router();
const Seat = require('../models/seats.model');


router.get('/seats', async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.get('/seats/random', async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.get('/seats/:id', async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.post('/seats', async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const newSeat = new Seat(
            {
                day: day,
                seat: seat,
                client: client,
                email: email
            }
        );
        await newSeat.save();
        res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.put('/seats/:id', async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const seats = await Seat.findById(req.params.id);
        if(seats) {
            seats.day = day;
            seats.seat = seat;
            seats.client = client;
            seats.email = email;

            await seats.save();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/seats/:id', async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await seat.remove();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;