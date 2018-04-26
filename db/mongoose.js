const mongoose = require('mongoose');

//telling mongoose to use the global JS promise lib
mongoose.Promise = global.Promise;

//connection to online database
mongoose.connect('mongodb://aditya:project_one@ds111319.mlab.com:11319/project_one').then(() => {
    console.log('succesfully connected to db');
} ,(err) => {
    console.log('unable to make connection to db');
    // console.log(err);
}); 

module.exports = {
    mongoose
}

