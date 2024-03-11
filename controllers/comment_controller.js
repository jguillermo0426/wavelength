const Comments = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}


function getAllComments() {
    var allComments = Comments.commentModel.find({}).lean();
    return allComments;
}


function getUserComments(username) {
    var userComments = Comments.commentModel.find({username: username}).lean();
    return userComments;
}

module.exports.getAllComments = getAllComments; 
module.exports.getUserComments = getUserComments; 
