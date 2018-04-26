const mongoose = require('mongoose');


let rams = mongoose.model('rams',{
    model:{
        type:String,
        required:true,
        trim:true
    },
    brand:{
        type:String,
        trim:true
    },
    'memory cofig':{
        type:Number,
        trim:true
    },
    'memory type':{
        type:String,
        trim:true
    },
    'memory':{
        type:Number,
        trim:true
    },
    'voltage':{
        type:String,
        trim:true
    },
    'speed':{
        type:Number,
        trim:true
    },
    'rgb':{
        type:String,
        trim:true
    },
    'height':{
        type:String,
        trim:true
    }
});

module.exports = { rams };