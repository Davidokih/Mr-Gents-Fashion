const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    avatarID: {
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)

