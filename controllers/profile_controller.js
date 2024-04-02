const Profiles = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}

// to be deleted, no longer needed 
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


function createInstance(user, pass) {
    const profileInstance = Profiles.profileModel({
        username : user, password : pass, user_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", header_image: "https://online.visual-paradigm.com/repository/images/b2c10a4f-bfaf-4528-b257-fbe1e780f220/twitter-headers-design/blank-twitter-header.png", bio : ""
    });
    return profileInstance;
}

function getLikes(username) {
    var likedPosts = Profiles.postModel.find({likes: username._id}).lean();
    return likedPosts;
}

module.exports.logUser = logUser; 
module.exports.getUserProfile = getUserProfile; 
module.exports.getProfileByPost = getProfileByPost;
module.exports.createInstance = createInstance;
module.exports.getLikes = getLikes;
