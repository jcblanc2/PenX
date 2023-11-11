const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('post', postSchema);