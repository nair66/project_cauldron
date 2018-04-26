const mongoose = require('mongoose');

let amd_proc = mongoose.model('amd_processors',{
    'processor id':{
        type:String,
        required:true,
        trim:true
    },
    'processor name':{
        type:String,
        trim:true
    },
    'cores':{
        type:String,
        trim:true
    },
    'gpu cores':{
        type:String,
        trim:true
    },
    'threads':{
        type:String,
        trim:true
    },
    'base clock':{
        type:String,
        trim:true
    },
    'max boost':{
        type:String,
        trim:true
    },
    'l1 cache':{
        type:String,
        trim:true
    },
    'l2 cache':{
        type:String,
        trim:true
    },
    'l3 cache':{
        type:String,
        trim:true
    },
    'graphics frequency':{
        type:String,
        trim:true
    },
    'graphics card model':{
        type:String,
        trim:true
    },
    'unlocked':{
        type:String,
        trim:true
    },
    'cmos':{
        type:String,
        trim:true
    },
    'socket':{
        type:String,
        trim:true
    },
    'pcie version':{
        type:String,
        trim:true
    },
    'stock cooler':{
        type:String,
        trim:true
    },
    'tdp':{
        type:String,
        trim:true
    },
    'max temp':{
        type:String,
        trim:true
    },
    'max system memory speed':{
        type:Number,
        trim:true
    },
    'system memory type':{
        type:String,
        trim:true
    },
    'system memory channels':{
        type:Number,
        trim:true
    }
});

let intel_proc = mongoose.model('intel_processors',{
    'processor id':{
        type:String,
        required:true,
        trim:true
    },
    'processor name':{
        type:String,
        trim:true
    },
    'cores':{
        type:String,
        trim:true
    },
    'threads':{
        type:String,
        trim:true
    },
    'base clock':{
        type:String,
        trim:true
    },
    'max boost':{
        type:String,
        trim:true
    },
    'cache':{
        type:String,
        trim:true
    },
    'TDP':{
        type:String,
        trim:true
    },
    'graphics':{
        type:String,
        trim:true
    },
    'pcie':{
        type:String,
        trim:true
    },
    'max pcie':{
        type:String,
        trim:true
    },
    'platform':{
        type:String,
        trim:true
    },
    'socket':{
        type:String,
        trim:true
    },
    'max system memory':{
        type:Number,
        trim:true
    },
    'system memory type':{
        type:String,
        trim:true
    },
    'system memory frequency':{
        type:Number,
        trim:true
    },
    'system memory channels':{
        type:Number,
        trim:true
    }
});

module.exports = {
    amd_proc,
    intel_proc
};