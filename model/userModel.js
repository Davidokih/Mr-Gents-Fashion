const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        unique: true
    },
    admin: {
        type: Boolean
    },
    adminPass: {
        type: String
    },
    verifiedToken: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    avatar: {
        type: String
    },
    avatarID: {
        type: String
    },
    // verifiedToken: {
    //     type: String
    // },
    uploads: [ {
        type: Schema.Types.ObjectId,
        ref: "upload"
    } ]
});

module.exports = mongoose.model("users", userSchema);

