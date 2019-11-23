const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = Schema({
    videoname: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    video_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("video", VideoSchema);