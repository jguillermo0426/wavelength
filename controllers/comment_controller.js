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

function getPostComments(postID) {
    var comments = Comments.commentModel.find({ postId: postID }).populate('postId').lean().exec();
    return comments;

}


module.exports.getAllComments = getAllComments; 
module.exports.getUserComments = getUserComments; 
module.exports.getPostComments = getPostComments;
