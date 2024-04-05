const Posts = require('../models/site_model');
var showdown  = require('showdown');
var converter = new showdown.Converter({'underline': 'true', 'strikethrough': 'true'});
function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

function getPostById (postID){
    var postID = Posts.postModel.findById(postID).populate('userId').lean();
    return postID;
}

function getPostInstance (postID){
    var post = Posts.postModel.findById(postID).populate('userId').exec();
    return post;
}


function getAllPosts() {
    var allPosts = Posts.postModel.find({}).populate('userId').populate('comments').lean();
    return allPosts;
}


function getUserPosts(username) {
    var userPosts = Posts.postModel.find({user: username}).lean();
    return userPosts;
}

function getUserPost(userID){
    var userPost = Posts.postModel.find({userId: userID}).populate('userId').lean();
    return userPost;
}


// function createPost(newPost) {
//     var postInstance = Posts.postModel(newPost);
//     return postInstance;
// }

function getAlbumReviews(id, posts){
    var reviewPosts = [];
    for (let j = 0; j < posts.length; j++) {
        if (posts[j].albumId === id) {
            reviewPosts.push(posts[j]);
        }
    }
    
    return reviewPosts;
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

async function removeCommentFromPost(commentID){
    await Posts.postModel.updateMany({}, {$pull: {comments: commentID}});
}

function markdownPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        var text = posts[i].postText;
        var html = converter.makeHtml(text);
        posts[i].markdown = html;
    }
}

async function removeReply(replyID){
    await Posts.postModel.updateMany({}, {$pull: {replies: replyID}});
}

module.exports = {
    getAllPosts,
    getUserPosts,
    // createPost,
    getPostById,
    getAlbumReviews,
    getSearched,
    getPostLikes,
    getPostDislikes,
    getPostInstance,
    removeCommentFromPost,
    getUserPost,
    markdownPosts,
    removeReply
}

