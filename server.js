const express = require('express');

const app = express();
const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const filterDB = id => (
    db.filter(content => content.id == id)
);

app.get('/testimonials', (req, res) => {
    res.send(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * db.length) + 1
    res.send(filterDB(randomNumber));
});

app.get('/testimonials/:id', (req, res) => {
    res.send(filterDB(req.params.id));
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
    filterDB(req.params.id).forEach(content => {
        content.author = req.body.author;
        content.text = req.body.text;
    });
    
    res.send({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
    if(db.indexOf(filterDB(req.params.id)[0]) > - 1) db.splice(db.indexOf(filterDB(req.params.id)[0]), 1);
    res.send({message: 'OK'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});