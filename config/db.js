const mongoose = require('mongoose');
const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/authentication', (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
};

module.exports = connectDB;
