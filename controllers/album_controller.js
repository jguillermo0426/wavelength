const Album = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}

function getAlbumPage(albumname){
    var album = Album.albumModel.find({ album_name: albumname }).lean();
    return artist;
}

/*
function getDiscogAlbums(artistname){
    var artist = Artist.artistModel.findOne({ artist_name: artistname }).populate('albumIds').lean().exec();
    return artist;
}
*/

module.exports = { getAlbumPage }