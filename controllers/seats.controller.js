const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch(err) {
        res.status(500).json({ message: err });
    }  
}

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.getID = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    } catch(err) {
        res.status(500).json({ message: err });
    }  
}

exports.postNew = async (req, res) => {
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
        req.io.emit('seatsUpdated', await Seat.find());
        res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

exports.updateOne = async (req, res) => {
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
}

exports.deleteOne = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await seat.remove();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
}