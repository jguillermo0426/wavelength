const Posts = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}


function getAllPosts() {
    var allPosts = Posts.find({}).lean();
    return allPosts;
}

module.exports.getAllPosts = getAllPosts; 
