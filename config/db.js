const mongoose = require('mongoose');
const connectDB = () => {
  mongoose.connect('database URL', (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
};

module.exports = connectDB;
