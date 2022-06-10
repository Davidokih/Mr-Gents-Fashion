const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    imageID: {
        type: String
    },
    Date: {
        type: Date,
        default: new Date
    },
    comments: [ {
        type: Schema.Types.ObjectId,
        ref: "comment"
    } ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model("upload", uploadSchema);