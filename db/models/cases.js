const mongoose = require('mongoose');

let cases = mongoose.model('cases',{
    'case id':{
        type: String,
        required: true,
        trim: true
    },
    'case name':{
        type: String,
        trim: true
    },
    'brand':{
        type: String,
        trim: true
    },
    'dimentions':{
        type: String,
        trim: true
    },
    'max gpu length':{
        type: String,
        trim: true
    },
    'max psu length':{
        type: String,
        trim: true
    },
    'case expansion slots':{
        type: String,
        trim: true
    },
    'form factor':{
        type: String,
        trim: true
    },
    'case drive bays':{
        type: String,
        trim: true
    },
    'weight':{
        type: String,
        trim: true
    },
    'case drive bays 3-5 inch':{
        type: String,
        trim: true
    },
    'case drive bays 2-5 inch':{
        type: String,
        trim: true
    },
    'power supply':{
        type: String,
        trim: true
    },
    'price':{
        type: String,
        trim: true
    },
    'io ports':{
        type: String,
        trim: true
    },
    'rgb':{
        type: String,
        trim: true
    },
    'cpu cooler':{
        type: String,
        trim: true
    }
});

module.exports = { cases };