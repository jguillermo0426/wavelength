const Comments = require('../models/site_model');

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

function getCommentById (commentID){
    var commentID = Comments.commentModel.findById(commentID).populate('userId').populate('postId').lean();
    return commentID;
}


function getAllComments() {
    var allComments = Comments.commentModel.find({}).populate('userId').lean();
    return allComments;
}


function getUserComments(userID) {
    var userComments = Comments.commentModel.find({userId: userID, deleted: false}).populate('userId').populate('postId').lean();
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
    //var postComments = Comments.postModel.find({comments: {$in: commentsId}}).populate('comments').lean().exec();
    var postComments =  Comments.commentModel.find({_id: {$in: commentsId}}).populate('userId').lean().exec();
    return postComments;
}

async function getCommentInstance (commentID){
    var comment = await Comments.commentModel.findById(commentID).populate('userId').exec();
    return comment;
}


function getCommentLikes(comments) {
    var commentLikes = Comments.profileModel.findOne({_id: {$in: comments}}).lean();
    return commentLikes;
}

function getCommentDislikes(comments) {
    var commentDislikes = Comments.profileModel.findOne({_id: {$in: comments}}).lean();
    return commentDislikes;
}

module.exports = {
    getAllComments,
    getUserComments,
    getPostComments,
    getCommentById,
    getCommentInstance,
    getCommentLikes,
    getCommentDislikes
}
