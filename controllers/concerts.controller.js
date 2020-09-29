const Concert = require('../models/concerts.model');
const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        const concerts = await Concert.find().lean();
        const seats = await Seat.find();

        concerts.forEach(con => {
            con.ticket = 50 - seats.filter(sea => sea.day === con.day).length;
        });

        res.json(concerts);
    } catch(err) {
        res.status(500).json({ message: err });
    }    
}

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne().skip(rand);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch(err) {
        res.status(500).json({ message: err });
    }  
}

exports.getID = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.postNew = async (req, res) => {
    try {
        const { performer, genre, price, day, image} = req.body;
        const newConcert = new Concert(
            {
                performer: performer,
                genre: genre,
                price: price,
                day: day,
                image: image
            }
        );
        await newConcert.save();
        res.json({ message: 'OK'});
    } catch(err) {
        res.status(500).json({ message: err });
    }
}

exports.updateOne = async (req, res) => {
    try {
        const { performer, genre, price, day, image} = req.body;
        const con = await Concert.findById(req.params.id);
        if(con) {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            con.image = image;

            await con.save();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.deleteOne = async (req, res) => {
    const con = await Concert.findById(req.params.id);
    if(con) {
        await con.remove();
        res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });   
} 