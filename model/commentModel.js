const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
    msg: {
        type: String
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: "upload"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

module.exports = model("comment", commentSchema)

