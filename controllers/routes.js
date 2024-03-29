const postController = require('./post_controller');
const profileController = require('./profile_controller');
const commentController = require('./comment_controller');
const artistController = require('./artist_controller');
const albumController = require('./album_controller');
const likeController = require('./like_controller');

function errorFn(err){
  console.log('Error found. Please trace!');
  console.error(err);
}

var loggedUser = [];
var isLogged = false;
/*
  To Do List ( "*" - done ; ">" = to be accomplished):  
    > Sign Up functionality
      > checking database for availability of username
      > Adding new user to database
    > Password hashing and remember session function
    > Home page
      > Like and dislike functionality
      > Comment functionality (can be redirection to view full post page)
      > Recent and Popular functionality
    > Sign up or log-in prompt (for unlogged user when trying to upvote, downvote, or comment)
    > Search Functionality
      > Searching posts 
      > Limit search with tags
    > Profile Page functionality (edit and delete functions should only be visible to logged user):
      > Edit Profile functionality
      > Edit Post functionality
      > Delete Post functionality
      > Edit Comment Functionality
      > Delete Comment Functionality
    > Artists Page 
      > Genres tag (get most popular genre tags for that artist)
      > Reviews average aggregate (get total number of reviews for that album)
      > Average score aggregate (get average score for that album
    > Album Page
      > Average Ratings aggregate
      > Make reviews in album page link to full post of review
    > Create Post Page
      > Search Album Pop-up (must list albums available in database and have ability to search for specific album)
      > Add tags
      > Markdown (optional for bonus points)
    > View Full Post Page
        > comment function
        > nested comments
        > liking and disliking other comments  
    > Add navigation menu in navigation bar (gawin ba to hahaha)
      > (to include view all artists)
      > tas nakalimutan ko na kung ano pa pwede ilagay
      > log-out (when a user is logged in)
    > add tags database (?)
    > error checking!

       
*/
function add(server){
    //HOMEPAGE
    server.get('/', function(req, resp){
      postController.getAllPosts().then(posts => {
        resp.render('main',{
          layout: 'index',
          title: 'Wavelength • Home',
          post_data: posts,
          isLogged: isLogged,
          user : loggedUser
        }); 
      
      }).catch(err => {
          console.error('Error occurred while getting posts:', err);
      });
    });

    //POST SEARCH RESULTS PAGE
    server.get('/search', function(req, resp){
      var searchquery = req.query.search;
      var option = req.query.options;

      postController.getSearched(searchquery, option).then(posts => {
        resp.render('searchresults', {
          layout: 'index',
          title: 'Wavelength • Search',
          post_data: posts,
          isLogged: isLogged,
          user: loggedUser
        }); 
      });
    });

    //LOGIN PAGE (add sessions in the future)
    server.get('/login', function(req, resp){
      resp.render('login',{
        layout: 'index',
        title: 'Wavelength • Log-in',
      });
    });

    server.post('/login', async (req, resp) => {
      var user = req.body.username;
      var pass = req.body.password;

      profileController.logUser(user, pass).then(function(user_data){
        console.log('Finding user');

        if(user_data != undefined && user_data._id != null){
          console.log(user_data);
          isLogged = true;
          loggedUser = user_data;
          resp.redirect('/');
          console.log('Redirecting');
        } else {
          // add detailed error handling in the future
          console.log('User and Password not found!')
          isLogged = false;
        }
      }).catch(errorFn);
    });

    // SIGNUP PAGE
    server.get('/signup', function(req, resp){
      resp.render('signup',{
        layout: 'index',
        title: 'Wavelength • Sign-up',
      });
    });

    server.post('/signup', async (req, resp) => {
      var user = req.body.username;
      var pass = req.body.password;

      profileController.logUser(user, pass).then(function(user_data){
        console.log('Finding user');

        if(user_data == undefined && user_data._id == null){
          //fix code that adds user to database (and makes pfp & header pic blank )
          isLogged = true;
          loggedUser = user_data;
          resp.redirect('/');
          console.log('Redirecting');
        } else {
          // add detailed error handling in the future
          console.log('User is takenfound!')
          isLogged = false;
        }
      }).catch(errorFn);
    });

    //PROFILE PAGE
    server.get('/profile-:username', function(req, resp){
      const username = req.params.username;

      profileController.getUserProfile(username).then(profile => {
      postController.getUserPosts(username).then(posts => {
      commentController.getUserComments(username).then(comments => {
      likeController.getLikedPosts(username).then(liked_posts => {
        //console.log(profile);
        console.log(liked_posts);
        //console.log(posts);
        resp.render('profile',{
          layout: 'index',
          title: 'Wavelength • '+ username,
          isLogged: isLogged,
          user : profile,
          post_data: posts,
          comment_data: comments,
          liked_posts: liked_posts,
        });
      }); 
      }).catch(errorFn);
      }).catch(errorFn);
      }).catch(errorFn); 
    });
    
    // ARTIST PAGE
    server.get('/artist-page/:artist', async (req, resp) => { // /artist-page/:artist_name
      const artistname = req.params.artist;
      console.log(artistname);
      artistController.getArtistPage(artistname).then(artist =>{
        console.log(artist);
        console.log('artist found!');
        artistController.getDiscogAlbums(artistname).then(artist_full => {
          console.log(artist_full);
          resp.render('artist', {
            layout: 'artistpage_layout',
            title: 'Wavelength • '+ artistname,
            artist: artist_full,
            isLogged: isLogged,
            user: loggedUser
          });
        });
      }).catch(errorFn);
    });


    //ALBUM PAGE
    server.get('/album-:albumname', function(req, resp){
      const albumname = req.params.albumname;

      albumController.getAlbum(albumname).then(album => {
      postController.getAlbumReviews(albumname).then(reviews =>{
        console.log(album);
        resp.render('album', {
          layout: 'albumpage_layout',
          title: 'Wavelength • '+ albumname,
          album: album,
          isLogged: isLogged,
          user: loggedUser,
          reviews: reviews
        });
      });
      });
    });

    //LOGOUT Function 
    server.get('/logout', async(req, resp) => {
      isLogged = false;
      loggedUser = [];
      console.log('Logging out');
      console.log(loggedUser);
      resp.redirect('/');
    })

    // CREATE POST
    server.get('/createpost', (req, resp) => {
      resp.render('createpost', { 
        layout: 'createpost_layout',
        title: 'Create Post' 
      }); 
    });

    server.post('/createpost', async (req, resp) => {
      try {
        const postData = req.body; 
        const newPost = await postController.createPost(postData);
        resp.redirect('/'); 
      } catch (error) {
        resp.status(500).send('Error creating post: ' + error.message);
      }
    });

    //VIEW POST PAGE
    server.get('/:title-:postID', function(req, resp){
      const postID = req.params.postID;

      profileController.getProfileByPost(postID).then(profile => {
        postController.getPostById(postID).then(post => {
          commentController.getPostComments(postID).then(comments => {
            //console.log(profile);
            console.log(comments);
            resp.render('viewpost',{
              layout: 'comment_layout',
              title: 'Wavelength • View Post',
              isLogged: isLogged,
              user: loggedUser,
              userpost : profile,
              post_data: post,
              comments: comments
            }); 
          }).catch(errorFn);
        }).catch(errorFn);
      }).catch(errorFn); 
    });
  }

module.exports.add = add;