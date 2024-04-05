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
        splitUrl = splitUrl.split("?si=")[0];
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
        splitUrl = splitUrl.split("?si=")[0];
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

function getAlbumArtistId(url) {
    
    return Album.spotifyApi.getAlbum(url)
    .then(data => {
        const artist = data.body.artists;
        if (!artist.length) {
            throw new Error('Album has no artists'); 
        }
        return artist[0].id;
    })
    .catch(error => {
        console.error('Error fetching artist:', error);
        return 'Artist';
    });
}

function getArtistName(id) {
    return Album.spotifyApi.getArtist(id)
    .then(data => {
        const artist = data.body.name;
        if (!artist.length) {
            throw new Error('No artists'); 
        }
        return artist;
    })
    .catch(error => {
        console.error('Error fetching artist:', error);
        return 'Artist';
    });
}

function getArtistPicture(id) {
    return Album.spotifyApi.getArtist(id)
    .then(data => {
        const artist = data.body.images[0].url;
        if (!artist.length) {
            throw new Error('No artists'); 
        }
        return artist;
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
        splitUrl = splitUrl.split("?si=")[0];
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

function getAlbumPosts(id, posts) {
    return Album.spotifyApi.getArtistAlbums(id, {include_groups: 'album,single', limit: 50})
    .then(data => {
        const albums = data.body.items;
        if (!albums.length) {
            throw new Error('No albums'); 
        }

        for (let i = 0; i < albums.length; i++) {
            var qty = 0;
            for (let j = 0; j < posts.length; j++) {
                if (posts[i].albumId === id) {
                    qty += 1;
                }
            }
            albums[i].reviews = qty;
        }
        return albums;
    })
    .catch(error => {
        console.error('Error fetching albums:', error);
        return 'Albums';
    });
}

function getAlbumData(id, posts) {
    return Album.spotifyApi.getAlbum(id)
    .then(data => {
        var albumData = {};
        const tempAlbum = data.body.album_type;
        if (!tempAlbum.length) {
            throw new Error('No artists'); 
        }

        var postRatings = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].albumId === id && posts[i].deleted === false) {
                postRatings.push(posts[i].rating);
            }
        }
    
        const averageRating = postRatings.reduce((a, b) => a + b, 0) / postRatings.length;


        const album = data.body;
        const name = album.name;
        const image = album.images[0].url;
        const tracks = album.tracks.items;
        const release_date = album.release_date;
        const artist = album.artists[0].name;
        const artistId = album.artists[0].id;
        const average = averageRating.toFixed(2);

        albumData.name = name;
        albumData.image = image;
        albumData.tracks = tracks;
        albumData.release_date = release_date;
        albumData.artist = artist;
        albumData.artistId = artistId;
        albumData.average = average;
        return albumData;
    })
    .catch(error => {
        console.error('Error fetching artist:', error);
        return 'Artist';
    });
}


module.exports.getAlbum = getAlbum;
module.exports.getAlbumCover = getAlbumCover;
module.exports.getAlbumArtist = getAlbumArtist;
module.exports.getAlbumName = getAlbumName;
module.exports.getArtistName = getArtistName;
module.exports.getArtistPicture = getArtistPicture;
module.exports.getAlbumPosts = getAlbumPosts;
module.exports.getAlbumData = getAlbumData;
module.exports.getAlbumArtistId = getAlbumArtistId;