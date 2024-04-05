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
    let allAlbums = [];
    let nextOffset = 0;
  
    const fetchAlbums = (offset) => {
      return Artist.spotifyApi.getArtistAlbums(id, { include_groups: 'album,single', limit: 50, offset })
        .then(data => {
          const albums = data.body.items;
          allAlbums = allAlbums.concat(albums); 

          if (albums.length === 50) {
            nextOffset += 50; 
            return fetchAlbums(nextOffset); 
          } else {
            for (let i = 0; i < allAlbums.length; i++) {
              var average = parseFloat(getAlbumAverage(allAlbums[i].id, posts));
              allAlbums[i].average = average.toFixed(2);
  
              var qty = 0;
              for (let j = 0; j < posts.length; j++) {
                if (posts[j].albumId === allAlbums[i].id && posts[j].deleted === false) {
                  qty += 1;
                }
              }
              allAlbums[i].reviews = qty;
            }

            allAlbums.sort(function (a, b) {
              let a_date = (new Date(a.release_date)).getTime();
              let b_date = (new Date(b.release_date)).getTime();
              return b_date - a_date;
            })
            return allAlbums;
          }
        })
        .catch(error => {
          console.error('Error fetching albums:', error);
          return 'Albums'; // Or handle the error differently
        });
    };
  
    return fetchAlbums(nextOffset); // Initial call to fetch first batch
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