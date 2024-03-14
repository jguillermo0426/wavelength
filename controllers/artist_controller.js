const Artist = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}

function getArtistPage(artistname){
    var artist = Artist.artistModel.find({ artist_name: artistname }).lean();
    return artist;
}


function getDiscogAlbums(artistname){
    var artist = Artist.artistModel.findOne({ artist_name: artistname }).populate('albumIds').lean().exec();
    return artist;
}

module.exports = { getArtistPage, getDiscogAlbums }