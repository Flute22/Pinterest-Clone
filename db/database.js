const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/pin-clone')
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Database connection error: ${err}`));

module.exports = mongoose