const express = require('express');
const router = express.Router();
const db = require('./../db');

const filterDB = id => (
    db.testimonials.filter(content => content.id == id)
);

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.testimonials.length) + 1
    res.json(filterDB(randomNumber));
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(filterDB(req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const newId = db.testimonials[db.testimonials.length-1].id + 1;
    db.testimonials.push({
       id: newId,
       author: req.body.author,
       text: req.body.text,
    });
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
    filterDB(req.params.id).forEach(content => {
        content.author = req.body.author;
        content.text = req.body.text;
    });
    
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
    if(db.testimonials.indexOf(filterDB(req.params.id)[0]) > - 1) db.testimonials.splice(db.testimonials.indexOf(filterDB(req.params.id)[0]), 1);
    res.json({message: 'OK'});
});

module.exports = router;