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


function getPostComments(postId, comments) {
    var commentsId = [];
    console.log('post id: ' + postId);
    for (i = 0; i < comments.length; i++) {
        console.log('comment post id:' + comments[i].postId.toString());
        if (comments[i].postId.toString() === postId) {
           commentsId.push(comments[i]._id);
           console.log('comment id:' + comments[i]._id);
        }
    }
    console.log(commentsId);
    var comments = Comments.postModel.find({comments: {$in: commentsId}}).populate('comments').lean().exec();
    return comments;
}

module.exports.getAllComments = getAllComments; 
module.exports.getUserComments = getUserComments; 
module.exports.getPostComments = getPostComments;
