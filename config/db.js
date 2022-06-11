const mongoose = require("mongoose");
require('dotenv').config();
const url = "mongodb+srv://Davidokih:dav517id@cluster0.1nweu.mongodb.net/mrGentApi?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.log(error);
});

module.exports = mongoose;