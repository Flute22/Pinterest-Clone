const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
    .connect(`${process.env.MONGO_URI}/pin-clone`)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Database connection error: ${err}`));

module.exports = mongoose