const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Collection = Schema({
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

module.exports = Collection;
