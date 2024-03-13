
const { Double } = require('bson');
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    cover: { type: String }, // Album cover, link to album model (?)
    trackName: { type: String }, // Album name, link to album model (?)
    artist: { type: String }, // Artist name, 
    trackLink: { type: String },
    artistLink: { type: String },
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

/*const artistSchema = new mongoose.Schema({
    artist_name: { type: String },
    artist_image: { type: String },
    genres: { type : [String], default: null },
    biography: String,

}, {versionKey: false});

const artistModel = mongoose.model('artist', artistSchema);

const albumSchema = new mongoose.Schema({
    album_name: String,
    artist_name: { type: Schema.Types.ObjectId, ref: 'artist'},
    release_date: Date,
    average_rating: Double,
    tags: { type : [String], default: null },
    tracklist: { type : [String] },

}, { versionKey: false}); */


module.exports = {postModel, 
                profileModel,
                commentModel};