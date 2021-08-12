const mongoose = require('mongoose');

//telling mongoose to use the global JS promise lib
mongoose.Promise = global.Promise;

connectionStr = '';
//connection to online database
mongoose.connect(connectionStr).then(() => {
    console.log('succesfully connected to db');
} ,(err) => {
    console.log('unable to make connection to db');
    // console.log(err);
}); 

module.exports = {
    mongoose
}

