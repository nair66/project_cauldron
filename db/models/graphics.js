const  mongoose = require('mongoose');

let graphics = mongoose.model('graphics',{
    'gpu id':{type :Number,
    required: true,
        trim: true
    },
    'gpu model':{
        type: String,
        trim: true
    },
    'brand':{
        type: String,
        trim: true
    },
    'core clock':{
        type: Number,
        trim: true
    },
    'memory':{
        type: String,
        trim: true
    },
    'dimensions':{
        type: String,
        trim: true
    },
    'memory interface':{
        type: String,
        trim: true
    },
    'wattage':{
        type: Number,
        trim: true
    },
    'price':{
        type: String,
        trim: true
    }
});


module.exports = {graphics};