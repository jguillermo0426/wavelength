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

function getAlbumCover(url) {
    if (url == null) {
        var splitUrl = url;
    }
    else {
        var splitUrl = url.replace("https://open.spotify.com/album/", "");
    }
    
    return Album.spotifyApi.getAlbum(splitUrl)
    .then(data => {
        const albumImages = data.body.images;
        if (!albumImages.length) {
            throw new Error('Album has no images');
        }
        return albumImages[0].url;
    })
    .catch(error => {
        console.error('Error fetching album cover:', error);
        return 'https://via.placeholder.com/150';
    });
}

function getAlbumArtist(url) {
    if (url == null) {
        var splitUrl = url;
    }
    else {
        var splitUrl = url.replace("https://open.spotify.com/album/", "");
    }
    
    return Album.spotifyApi.getAlbum(splitUrl)
    .then(data => {
        const artist = data.body.artists;
        if (!artist.length) {
            throw new Error('Album has no artists'); 
        }
        return artist[0].name;
    })
    .catch(error => {
        console.error('Error fetching artist:', error);
        return 'Artist';
    });
}

function getAlbumName(url) {
    if (url == null) {
        var splitUrl = url;
    }
    else {
        var splitUrl = url.replace("https://open.spotify.com/album/", "");
    }
    
    return Album.spotifyApi.getAlbum(splitUrl)
    .then(data => {
        const name = data.body.name;
        console.log(name);
        if (!name) {
            throw new Error('Album has no name'); 
        }
        return name;
    })
    .catch(error => {
        console.error('Error fetching name:', error);
        return 'Track Name';
    });
}


module.exports.getAlbum = getAlbum;
module.exports.getAlbumCover = getAlbumCover;
module.exports.getAlbumArtist = getAlbumArtist;
module.exports.getAlbumName = getAlbumName;