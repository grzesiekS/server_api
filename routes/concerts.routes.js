const express = require('express');
const router = express.Router();
const db = require('./../db');

const filterDB = id => (
    db.concerts.filter(content => content.id == id)
);

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.concerts.length) + 1
    res.json(filterDB(randomNumber));
});

router.route('/concerts/:id').get((req, res) => {
    res.json(filterDB(req.params.id));
});

router.route('/concerts').post((req, res) => {
    const newId = db.concerts[db.concerts.length-1].id + 1;
    db.concerts.push({
       id: newId,
       performer: req.body.performer,
       genre: req.body.genre,
       price: req.body.price,
       day: req.body.day,
       image: req.body.image,
    });
    res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
    filterDB(req.params.id).forEach(content => {
        content.performer = req.body.performer;
        content.genre = req.body.genre;
        content.price = req.body.price;
        content.day = req.body.day;
        content.image = req.body.image;
    });
    
    res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
    if(db.concerts.indexOf(filterDB(req.params.id)[0]) > - 1) db.concerts.splice(db.concerts.indexOf(filterDB(req.params.id)[0]), 1);
    res.json({message: 'OK'});
});

module.exports = router;