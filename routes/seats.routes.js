const express = require('express');
const router = express.Router();
const db = require('./../db');

const filterDB = id => (
    db.seats.filter(content => content.id == id)
);

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.seats.length) + 1
    res.json(filterDB(randomNumber));
});

router.route('/seats/:id').get((req, res) => {
    res.json(filterDB(req.params.id));
});

router.route('/seats').post((req, res) => {
    const seatFilter = db.seats.filter(seat => seat.day == req.body.day);
    if(seatFilter.some(seat => seat.seat == req.body.seat)) {
        res.status(403).json({message: 'The slot is already taken...'});
    } else {
        const newId = db.seats[db.seats.length-1].id + 1;
        db.seats.push({
            id: newId,
            day: req.body.day,
            seat: req.body.seat,
            client: req.body.client,
            email: req.body.email,
        });
        req.io.emit('seatsUpdated', db.seats);
        res.json({message: 'OK'});
    }
});

router.route('/seats/:id').put((req, res) => {
    filterDB(req.params.id).forEach(content => {
        content.day = req.body.day;
        content.seat = req.body.seat;
        content.client = req.body.client;
        content.email = req.body.email;
    });
    
    res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
    if(db.seats.indexOf(filterDB(req.params.id)[0]) > - 1) db.seats.splice(db.seats.indexOf(filterDB(req.params.id)[0]), 1);
    res.json({message: 'OK'});
});

module.exports = router;