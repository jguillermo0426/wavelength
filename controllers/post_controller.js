const Posts = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
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
    var postInstance = Posts.postModel(newPost).add();
    return postInstance;
}

module.exports = {
    getAllPosts,
    getUserPosts,
    createPost
}

