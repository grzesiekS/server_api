const express = require('express');
const cors = require('cors');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'})
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});