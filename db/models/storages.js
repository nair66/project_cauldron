const mongoose = require('mongoose');

let storages = mongoose.model('storages', {
    'model id': {
        type: String,
        required: true,
        trim: true
    },
    'brand': {
        type: String,
        trim: true
    },
    'form factor': {
        type: String,
        trim: true
    },
    'performance class': {
        type: String,
        trim: true
    },
    'capacity': {
        type: String,
        trim: true
    },
    'interface': {
        type: String,
        trim: true
    }
});

module.exports = { storages };