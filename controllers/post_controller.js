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

function getSearched(query, option) {
    
    if (option === "tag") {
        var posts = Posts.postModel.find({$or:[
            {tag1: {$regex: query, $options: 'i' }},
            {tag2: {$regex: query, $options: 'i' }},
            {tag3: {$regex: query, $options: 'i' }}
        ]}).lean();
    }
    else {
        var posts = Posts.postModel.find({[option]: {$regex: query, $options: 'i' }}).lean();
    }
    return posts;
}

function getPostLikes(posts) {
    var postLikes = Posts.profileModel.findOne({_id: {$in: posts}}).lean();
    return postLikes;
}

function getPostDislikes(posts) {
    var postDislikes = Posts.profileModel.findOne({_id: {$in: posts}}).lean();
    return postDislikes;
}


module.exports = {
    getAllPosts,
    getUserPosts,
    createPost,
    getPostById,
    getAlbumReviews,
    getSearched,
    getPostLikes,
    getPostDislikes
}

