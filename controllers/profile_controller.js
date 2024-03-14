const Profiles = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}


function logUser(username, password){
    const searchQuery = { username: username, password: password };

    var profile = Profiles.profileModel.findOne(searchQuery).lean();
    return profile;
}

function getUserProfile(username){
    var profile = Profiles.profileModel.findOne({username: username}).lean();
    return profile;
}

function getProfileByPost(postID) {
    return Profiles.postModel.findById(postID).then(post => {
        if (!post) {
            console.error('Post not found');
            return;
        }

        const username = post.user;
        const profile = getUserProfile(username);

        return profile;
    }).catch(errorFn);
}

module.exports.logUser = logUser; 
module.exports.getUserProfile = getUserProfile; 
module.exports.getProfileByPost = getProfileByPost;
