const mongoose = require('mongoose');

let coolers = mongoose.model('coolers', {
    'product id': {
        type: String,
        required: true,
        trim: true
    },
    'product name': {
        type: String,
        trim: true
    },
    'brand': {
        type: String,
        trim: true
    },
    'intel 1151': {
        type: Boolean,
        trim: true
    },
    'am4': {
        type: Boolean,
        trim: true
    },
    'fan dimentions': {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    LED: {
        type: String,
        trim: true
    },
    cooling:{
        type:String,
        trim:true
    },
    'air flow':{
        type:String,
        trim:true
    },
    'cooler height':{
        type:String,
        trim:true
    },
    'low profile':{
        type:Boolean,
        trim:true
    },
    'ATX exclusive':{
        type:Boolean,
        trim:true
    },
    price:{
        type:String,
        trim:true
    }
});


module.exports = {coolers};