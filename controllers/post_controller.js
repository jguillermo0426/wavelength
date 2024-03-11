const Posts = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}


function getAllPosts() {
    var allPosts = Posts.postModelModel.find({}).lean();
    return allPosts;
}


function getUserPosts(username) {
    var userPosts = Posts.postModel.find({user: username}).lean();
    return userPosts;
}

module.exports.getAllPosts = getAllPosts; 
module.exports.getUserPosts = getUserPosts;
