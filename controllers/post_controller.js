const Posts = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

function getPostById (postID){
    var postID = Posts.postModel.findById(postID).lean();
    return postID;
}


function getAllPosts() {
    var allPosts = Posts.postModel.find({}).lean();
    return allPosts;
}


function getUserPosts(username) {
    var userPosts = Posts.postModel.find({user: username}).lean();
    return userPosts;
}


function createPost(newPost) {
    var postInstance = Posts.postModel(newPost);
    return postInstance;
}

function getAlbumReviews(albumName){
    var albumReviews = Posts.postModel.find({trackName: albumName}).lean();
    return albumReviews;
}

module.exports = {
    getAllPosts,
    getUserPosts,
    createPost,
    getPostById,
    getAlbumReviews
}

