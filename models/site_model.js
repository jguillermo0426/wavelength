
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    cover: String,
    trackName: String,
    artist: String,
    trackLink: String,
    artistLink: String,
    rating: Number, 
    user: String, 
    userLink: String,
    reviewDate: String,
    tag1: String,
    tag2: String,
    tag3: String,
    title: String,
    likes: Number,
    dislikes: Number,
    comments: Number,
    postText: String,
    postLink: String
},{ versionKey: false });

const wavelengthModel = mongoose.model('post_data', postSchema);

module.exports = wavelengthModel;