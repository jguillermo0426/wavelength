
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
    replies: [{ type: Schema.Types.ObjectId, ref: 'reply'}],
    postText: String,
    edited: Boolean,
    deleted: Boolean,
    artistId: String,
    albumId: String,
    userId: { type: Schema.Types.ObjectId, ref: 'profile'},
    timeReviewed: Number
},{ versionKey: false });

const postModel = mongoose.model('post_data', postSchema);


const profileSchema = new mongoose.Schema({
    username: { type : String , required: true, unique: true },
    password: { type : String , required: true },
    bio: String,
    user_image: String,
    header_image: String
}, {versionKey: false});

const profileModel = mongoose.model('profile', profileSchema);


const commentSchema = new mongoose.Schema({
    commentText: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'profile'}],
    dislikes:[ { type: Schema.Types.ObjectId, ref: 'profile'}],
    replies: [{ type: Schema.Types.ObjectId, ref: 'reply'}],
    edited: Boolean,
    deleted: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'profile'},
    postId: { type: Schema.Types.ObjectId, ref: 'post_data'},
    commentDate: String,
    timeCommented: Number
}, {versionKey: false});

const commentModel = mongoose.model('comment', commentSchema);

const replySchema = new mongoose.Schema({
    replyText: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'profile'}],
    dislikes:[ { type: Schema.Types.ObjectId, ref: 'profile'}],
    edited: Boolean,
    deleted: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: 'profile'},
    postId: { type: Schema.Types.ObjectId, ref: 'post_data'},
    commentId: { type: Schema.Types.ObjectId, ref: 'comment'},
    replyDate: String,
    timeReplied: Number
}, {versionKey: false});

const replyModel = mongoose.model('reply', replySchema);

module.exports = {postModel, 
                profileModel,
                commentModel,
                spotifyApi,
                replyModel};
