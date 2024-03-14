const { get } = require('mongoose');
const Album = require('../models/site_model');

function errorFn(err){
    console.log('Error found. Please trace!');
    console.error(err);
}

function getAlbum(albumName){
    var album = Album.albumModel.findOne({ album_name : albumName }).lean();
    return album;
}


module.exports.getAlbum = getAlbum;