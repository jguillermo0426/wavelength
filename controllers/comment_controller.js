const Comments = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

function getCommentById (commentID){
    var commentID = Comments.commentModel.findById(commentID).lean();
    return commentID;
}


function getAllComments() {
    var allComments = Comments.commentModel.find({}).populate('userId').lean();
    return allComments;
}


function getUserComments(userID) {
    var userComments = Comments.commentModel.find({userId: userID}).populate('userId').populate('postId').lean();
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

async function getCommentInstance (commentID){
    var comment = await Comments.commentModel.findById(commentID).populate('userId').exec();
    return comment;
}

module.exports = {
    getAllComments,
    getUserComments,
    getPostComments,
    getCommentById,
    getCommentInstance
}
