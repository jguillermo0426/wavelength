const Artist = require('../models/site_model');
const { getAlbum } = require('./album_controller');

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

function getAlbumAverage(id, posts) {
    var postRatings = [];
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].albumId === id && posts[i].deleted === false) {
            postRatings.push(posts[i].rating);
        }
    }

    const averageRating = postRatings.reduce((a, b) => a + b, 0) / postRatings.length;
    return averageRating;
}

function getArtistAlbums(id, posts) {
    return Artist.spotifyApi.getArtistAlbums(id, {include_groups: 'album,single', limit: 50})
    .then(data => {
        const albums = data.body.items;
        if (!albums.length) {
            throw new Error('No albums'); 
        }

        for (let i = 0; i < albums.length; i++) {
            var average = parseFloat(getAlbumAverage(data.body.items[i].id, posts));
            albums[i].average = average.toFixed(2);
        }

        
        for (let i = 0; i < albums.length; i++) {
            var qty = 0;
            for (let j = 0; j < posts.length; j++) {
                if (posts[j].albumId === albums[i].id) {
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

function getArtistGenres(id) {
    return Artist.spotifyApi.getArtist(id)
    .then(data => {
        const artist = data.body.genres;
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

module.exports = { getArtistPage, getDiscogAlbums, getArtistAlbums, getArtistGenres }