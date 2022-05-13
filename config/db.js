const mongoose = require("mongoose")
require('dotenv').config()
const url = process.env.ATLAS_KEY

mongoose.connect(url).then(() => {
    console.log(`Connected to data base`)
}).catch((err) => {
    console.log(err.message)
})