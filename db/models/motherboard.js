const mongoose = require('mongoose');

let amd_mobo = mongoose.model('amd_motherboards', {
    'mbid': {
        type: String,
        required: true,
        trim: true
    },
    'mbname': {
        type: String,
        trim: true
    },
    'chipset': {
        type: String,
        trim: true
    },
    'cpu socket': {
        type: String,
        trim: true
    },
    'memory slots': {
        type: String,
        trim: true
    },
    'max memory support': {
        type: Number,
        trim: true
    },
    'max memory frequency': {
        type: Number,
        trim: true
    },
    'overclock': {
        type: String,
        trim: true
    },
    'expansion slots': {
        type: String,
        trim: true
    },
    'sound': {
        type: String,
        trim: true
    },
    'networking': {
        type: String,
        trim: true
    },
    'ports': {
        type: String,
        trim: true
    },
    'dimentions': {
        type: String,
        trim: true
    },
    'form factor': {
        type: String,
        trim: true
    },
    'sli': {
        type: String,
        trim: true
    },
    'crossfire': {
        type: String,
        trim: true
    }
});

let intel_mobo = mongoose.model('intel_motherboards', {
    'mbid': {
        type: String,
        required: true,
        trim: true
    },
    'mbname': {
        type: String,
        trim: true
    },
    'chipset': {
        type: String,
        trim: true
    },
    'processor support': {
        type: String,
        trim: true
    },
    'cpu sockets': {
        type: String,
        trim: true
    },
    'memory slots': {
        type: String,
        trim: true
    },
    'max memory support': {
        type: Number,
        trim: true
    },
    'max memory frequency': {
        type: Number,
        trim: true
    },
    'overclock': {
        type: String,
        trim: true
    },
    'expansion slots': {
        type: String,
        trim: true
    },
    'sound': {
        type: String,
        trim: true
    },
    'networking': {
        type: String,
        trim: true
    },
    'ports': {
        type: String,
        trim: true
    },
    'dimentions': {
        type: String,
        trim: true
    },
    'form factor': {
        type: String,
        trim: true
    },
    'sli': {
        type: String,
        trim: true
    },
    'crossfire': {
        type: String,
        trim: true
    }

});

module.exports = {
    amd_mobo,
    intel_mobo
};