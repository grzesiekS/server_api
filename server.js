const express = require('express');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const filterDB = id => (
    db.testimonials.filter(content => content.id == id)
);

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * db.testimonials.length) + 1
    res.json(filterDB(randomNumber));
});

app.get('/testimonials/:id', (req, res) => {
    res.json(filterDB(req.params.id));
});

app.post('/testimonials', (req, res) => {
    const newId = db.testimonials[db.testimonials.length-1].id + 1;
    db.testimonials.push({
       id: newId,
       author: req.body.author,
       text: req.body.text,
    });
    res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
    filterDB(req.params.id).forEach(content => {
        content.author = req.body.author;
        content.text = req.body.text;
    });
    
    res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
    if(db.testimonials.indexOf(filterDB(req.params.id)[0]) > - 1) db.testimonials.splice(db.testimonials.indexOf(filterDB(req.params.id)[0]), 1);
    res.json({message: 'OK'});
});

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'})
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});