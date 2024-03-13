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
    var profile = Profiles.profileModel.find({username: username}).lean();
    return profile;
}

module.exports.logUser = logUser; 
module.exports.getUserProfile = getUserProfile; 
