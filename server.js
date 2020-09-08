const express = require('express');

const app = express();
const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.send(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * db.length) + 1
    res.send(db.filter(content => content.id === randomNumber));
});

app.get('/testimonials/:id', (req, res) => {
    res.send(db.filter(content => content.id === parseInt(req.params.id)));
});

app.post('/testimonials', (req, res) => {
    const newId = db[db.length-1].id + 1;
    db.push({
       id: newId,
       author: req.body.author,
       text: req.body.text, 
    });
    res.send({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
    db.filter(content => content.id === parseInt(req.params.id)).forEach(content => {
        content.author = req.body.author;
        content.text = req.body.text;
    });
    
    res.send({message: 'OK'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});