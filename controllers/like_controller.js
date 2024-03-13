const Likes = require('../models/site_model');

function getLikedPosts(username) {
    var likedPosts = Likes.likePostModel.find({username: username}).populate('postId').lean().exec();
    return likedPosts;
}

module.exports.getLikedPosts = getLikedPosts;