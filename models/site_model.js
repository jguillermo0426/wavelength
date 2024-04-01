
const { Double } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: "1c191b56a7214acfb136f009122cc556",
    clientSecret: "dbacde75c3e24c75b5517190f17155e6"
});

spotifyApi.clientCredentialsGrant().then(data => {
    console.log(data.body)
    spotifyApi.setAccessToken(data.body["access_token"]);
}).catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
});

const postSchema = new mongoose.Schema({
    cover: { type: String }, // Album cover, link to album model (?)
    trackName: { type: String }, // Album name, link to album model (?)
    artist: { type: String }, // Artist name, 
    rating: Number, 
    user: String, 
    reviewDate: String,
    tag1: String,
    tag2: String,
    tag3: String,
    title: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'profile'}],
    dislikes:[ { type: Schema.Types.ObjectId, ref: 'profile'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment'}],
    postText: String,
    edited: Boolean,
    deleted: Boolean
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
    commentText: String,
    likes: Number,
    dislikes: Number,
    replies: Number
}, {versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);

const artistSchema = new mongoose.Schema({
    artist_name: { type: String },
    artist_image: { type: String },
    genres: { type : [String], default: null },
    biography: { type: String },
    albumIds: [{ type: Schema.Types.ObjectId, ref: 'album' }]

}, {versionKey: false});

const artistModel = mongoose.model('artist', artistSchema);

const albumSchema = new mongoose.Schema({
    album_name: String,
    album_image: String,
    artist_name: String,
    _artistId: { type : Schema.Types.ObjectId, ref: 'artist' },
    release_date: String,
    release_year: String,
    average_rating: Number, //aggregate: average of every reviews of the album
    reviews: Number, // aggregate: total number of reviews
    tags: { type : [String], default: null },
    tracklist: { type : [String] },

}, { versionKey: false});

const albumModel = mongoose.model('album', albumSchema);

module.exports = {postModel, 
                profileModel,
                commentModel,
                artistModel, 
                albumModel,
                spotifyApi};
