const mongoose = require('mongoose');

let psu = mongoose.model('psus', {
    'psu id': {
        type: String,
        required: true,
        trim: true
    },
    'psu model': {
        type: String,
        trim: true
    },
    'brand': {
        type: String,
        trim: true
    },
    'total watts': {
        type: String,
        trim: true
    },
    'form factor': {
        type: String,
        trim: true
    },
    'dimentions': {
        type: String,
        trim: true
    },
    'modular': {
        type: String,
        trim: true
    },
    'pcie connector': {
        type: String,
        trim: true
    },
    'sata connector': {
        type: String,
        trim: true
    },
    'efficiency': {
        type: String,
        trim: true
    },
    'multi gpu ready': {
        type: String,
        trim: true
    },
    'eps connector': {
        type: String,
        trim: true
    },
    'atx connector': {
        type: String,
        trim: true
    }
});

module.exports = { psu };