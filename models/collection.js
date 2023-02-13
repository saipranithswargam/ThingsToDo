const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    color: { type: String },
    list: [{ type: String }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Collection = mongoose.model('collection',collectionSchema)

module.exports = Collection;
