const Profiles = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}

function getProfile(username) {
    var profile = Profiles.profileModel.findOne({ username: username}).lean();
    return profile;
}

module.exports.getProfile = getProfile; 
