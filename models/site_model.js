
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

const postModel = mongoose.model('post_data', postSchema);


const profileSchema = new mongoose.Schema({
    username: String,
    password: String,
    bio: String,
    user_image: String,
    header_image: String
}, {versionKey: false});

const profileModel = mongoose.model('profile', profileSchema);


const commentSchema = new mongoose.Schema({
    username: String,
    user_image: String,
    postTitle: String,
    commentText: String,
    likes: Number,
    dislikes: Number,
    replies: Number
}, {versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);


module.exports = {postModel, 
                profileModel,
                commentModel};