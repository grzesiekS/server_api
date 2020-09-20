const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const tes = await Testimonial.findOne().skip(rand);
        if(!tes) res.status(404).json({ message: 'Not found...' });
        else res.json(tes);
    } catch(err) {
        res.status(500).json({ message: err });
    }    
}

exports.getID = async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if(!tes) res.status(404).json({ message: 'Not found...' });
        else res.json(tes);
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.postNew = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial(
            {
                author: author,
                text: text,
            }
        );
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }   
}

exports.updateOne = async (req, res) => {
    try {
        const { author, text } = req.body;
        const tes = await Testimonial.findById(req.params.id);
        if(tes) {
            tes.author = author;
            tes.text = text;

            await tes.save();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }    
}

exports.deleteOne = async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if(tes) {
            await tes.remove();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
    }    
}