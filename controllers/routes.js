const postController = require('./post_controller');
const profileController = require('./profile_controller');
const commentController = require('./comment_controller');
const artistController = require('./artist_controller');
const albumController = require('./album_controller');
const Model = require('../models/site_model');
const { trusted } = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const bcrypt = require('bcrypt');

const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

function errorFn(err){
  console.log('Error found. Please trace!');
  console.error(err);
}

var loggedUser = [];
var isLogged = false;
/*
  To Do List ( "*" - done ; ">" = to be accomplished):  
    > Sign Up functionality (error checking nalang pati sa log-in, di ko mapagana nang maayos yung resp.send -rence)
      * checking database for availability of username
      * Adding new user to database
    * Password hashing
    > remember session function
    > Home page
      * Like and dislike functionality
      * Comment functionality (can be redirection to view full post page)
      * Recent and Popular functionality
    > Sign up or log-in prompt (for unlogged user when trying to upvote, downvote, or comment)
    > Search Functionality
      * Searching posts 
      * Limit search with tags
    > Profile Page functionality (edit and delete functions should only be visible to logged user):
      > Edit Profile functionality
      * Edit Post functionality
      * Delete Post functionality
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
      * Search Album Pop-up (must list albums available in database and have ability to search for specific album)
      * Add tags
      > Markdown (optional for bonus points)
      > Search tag popup
      > Submit post 
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
    //Session
    const mongo_uri = 'mongodb+srv://wavelength_group:wavelength@wavelength.gszzu7l.mongodb.net/wavelength';
    server.use(session({
      secret: 'like its magnetic',
      saveUninitialized: true, 
      resave: true,
      store: new mongoStore({ 
        uri: mongo_uri,
        collection: 'mySession',
        expires: 21*24*1000*60*60 // 3 weeks
      })
    }));

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
        //console.log(posts);
      }).catch(err => {
          console.error('Error occurred while getting posts:', err);
      });
    });

    server.post('/like-dislike', function(req, resp){
      if (isLogged === true) {
        var id = req.body.postId;
        var liked = false;
        var disliked = false;
        var match = false;
        postController.getPostById(id).then(post => {
          postController.getPostLikes(post.likes).then(postLikes => {
            postController.getPostDislikes(post.dislikes).then(postDislikes => {
              if (post.likes.length || post.dislikes.length) {
                if (postLikes && postLikes._id.toString() === loggedUser._id.toString()) {
                  liked = false; //unlike
                  disliked = true;
                  console.log(id, '1', liked, disliked);
                }
                else if (postLikes && postLikes._id.toString() != loggedUser._id.toString() && postDislikes && postDislikes._id.toString() != loggedUser._id.toString()) {
                  liked = true; //like
                  disliked = true;
                  console.log(id, '2', liked, disliked);
                } 
                else if (postDislikes && postDislikes._id.toString() === loggedUser._id.toString()) {
                  disliked = false;
                  liked = true;
                  console.log(id, '5', liked, disliked);
                }
                else {
                  liked = true; //like
                  disliked = true;
                  console.log(id, '8', liked, disliked);
                }
              }
              else {
                liked = true; //like
                disliked = true;
                console.log(id, '3', liked, disliked);
              }

              if (req.body.type === 'clicked') {
                if (liked === false) {
                  Model.postModel.findOneAndUpdate({_id: post._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(postLikes => {
                    if (disliked === true && req.body.click === 'dislike') {
                      Model.postModel.findOneAndUpdate({_id: post._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(postDislikes => {
                        resp.send({
                          liked: liked,
                          likes: post.likes.length,
                          disliked: disliked,
                          dislikes: post.dislikes.length,
                          match: match
                        });
                        console.log('disliked 2');
                      });
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: post.likes.length,
                        disliked: disliked,
                        dislikes: post.dislikes.length,
                        match: match
                      });
                      console.log('unliked 2');
                    }
                  });
                }
                else if (liked === true && req.body.click === 'like') {
                  Model.postModel.findOneAndUpdate({_id: post._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(postLikes => {
                    if (disliked === false) {
                      Model.postModel.findOneAndUpdate({_id: post._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(postDislikes => {
                        resp.send({
                          liked: liked,
                          likes: post.likes.length,
                          disliked: disliked,
                          dislikes: post.dislikes.length,
                          match: match
                        });
                        console.log('undisliked 1');
                      });
                    }
                    else if (disliked === true) {
                      resp.send({
                        liked: liked,
                        likes: post.likes.length,
                        disliked: disliked,
                        dislikes: post.dislikes.length,
                        match: match
                      });
                    console.log('liked 1');
                    }
                  });
                }
                else if (disliked === false) {
                  Model.postModel.findOneAndUpdate({_id: post._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(postDislikes => {
                    if (liked === false) {
                      Model.postModel.findOneAndUpdate({_id: post._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(postLikes => {
                        resp.send({
                          liked: liked,
                          likes: post.likes.length,
                          disliked: disliked,
                          dislikes: post.dislikes.length,
                          match: match
                        });
                        console.log("liked 2");
                      });
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: post.likes.length,
                        disliked: disliked,
                        dislikes: post.dislikes.length,
                        match: match
                      });
                      console.log('undisliked 2');
                    }
                  });
                }
                else if (disliked === true) {
                  Model.postModel.findOneAndUpdate({_id: post._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(postDislikes => {
                    if (liked === false) {
                      Model.postModel.findOneAndUpdate({_id: post._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(postLikes => {
                        resp.send({
                          liked: liked,
                          likes: post.likes.length,
                          disliked: disliked,
                          dislikes: post.dislikes.length,
                          match: match
                        });
                        console.log('unliked 1');
                      });
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: post.likes.length,
                        disliked: disliked,
                        dislikes: post.dislikes.length,
                        match: match
                      });
                    console.log('disliked 1');
                    }
                  });
                }
                console.log('\n');
              }
              else if (req.body.type === 'load') {
                resp.send({liked: liked, disliked: disliked, id: post._id});
              }
            });
          }); 
        });
      }
      else {
        resp.send({output: "nouser"});
      }
    });

    //POST SEARCH RESULTS PAGE
    server.get('/search', function(req, resp){
      var searchquery = req.query.search;
      var option = req.query.options;

      if (option === "username") {
        profileController.getUserProfile(searchquery).then(user => {
          if (user != null) {
            resp.redirect('profile-' + searchquery);
          }
          else {
            postController.getSearched(searchquery, option).then(posts => {
              resp.render('searchresults', {
                layout: 'index',
                title: 'Wavelength • Search',
                post_data: posts,
                isLogged: isLogged,
                user: loggedUser
              }); 
            });
          }
        }); 
      }
      else {
        postController.getSearched(searchquery, option).then(posts => {
          resp.render('searchresults', {
            layout: 'index',
            title: 'Wavelength • Search',
            post_data: posts,
            isLogged: isLogged,
            user: loggedUser
          }); 
        });
      }
    });

    //LOGIN PAGE (add sessions in the future)
    server.get('/login', function(req, resp){
      resp.render('login',{
        layout: 'index',
        title: 'Wavelength • Log-in',
      });
    });

    server.post('/login', async (req, resp) => {
      let user = req.body.username;
      let pass = req.body.password;
      let remember = req.body.rememberme;

      console.log(remember);

      profileController.getUserProfile(user).then(function(user_data){
        console.log('Finding user');
        
        if(user_data != undefined && user_data._id != null){
          bcrypt.compare(pass, user_data.password, function(err, result) {
            if(result){
              console.log(user_data);
              isLogged = true;
              loggedUser = user_data;
              if(remember === 'true'){
                req.session.login_user = user_data._id;
                req.session.login_id = req.sessionID;
              }
              console.log(req.session); // for checking
              resp.redirect('/');
              console.log('Redirecting');
            } else {
              console.log('Password is incorrect');
              resp.render('login',{
                layout: 'index',
                title: 'Wavelength • Log-in',
                message: "Password is incorrect",
                username: user,
                password: pass
              });
            }
          });
        } else {
          console.log('User not found.')
          resp.render('login',{
            layout: 'index',
            title: 'Wavelength • Log-in',
            message: "User not found.",
            username: user,
            password: pass
          });
          isLogged = false;
        }
      }).catch(errorFn);
    });

    // SIGNUP PAGE
      // First check if username is taken, if not create a user and put a blank header and blank pfp
    server.get('/signup', function(req, resp){
      resp.render('signup',{
        layout: 'index',
        title: 'Wavelength • Sign-up',
      });
    });

    server.post('/signup', async (req, resp) => {
      const username = String(req.body.username);
      const password = String(req.body.password);
      const confirmpassword = String(req.body.confirmpassword);
      
      console.log(username);
      console.log(password);
      console.log(confirmpassword);

      profileController.getUserProfile(username).then(function(user_data){
        console.log('Checking validity of username...');

        if(user_data != undefined && user_data._id != null){
          resp.render('signup',{
            layout: 'index',
            title: 'Wavelength • Sign-up',
            status: 'bad',
            message: 'Username already taken',
            username: username,
            password: password,
            confirmpassword: confirmpassword
          });
          console.log('Username already taken');
        } else if(password != confirmpassword){
          resp.render('signup',{
            layout: 'index',
            title: 'Wavelength • Sign-up',
            status: 'bad',
            message: 'Passwords do not match',
            username: username
          });
          console.log('Passwords do not match');
        } else {

          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, function(err,hash){
            encrypted_pass = hash;
            console.log("Encrypted pass: " +encrypted_pass);
            const profileInstance = profileController.createInstance(username ,hash);

            profileInstance.save().then(function(action) {
              isLogged = false;
              resp.redirect('/');
              console.log('Redirecting');
            }).catch(errorFn); 
          });
          
          
        }
      }).catch(errorFn);
    });

    //PROFILE PAGE
    server.get('/profile-:username', function(req, resp){
      const username = req.params.username;

      profileController.getUserProfile(username).then(profile => {
      const userID = String(profile._id);
      postController.getUserPost(userID).then(posts => {
      commentController.getUserComments(userID).then(comments => {
      profileController.getLikes(profile).then(liked_posts => {
        //console.log(profile);
        //console.log(loggedUser._id);
        //console.log(liked_posts);
        //console.log(userID);
        //console.log(posts);

        sameLoggedProfile = false;
        if(String(loggedUser._id) == String(profile._id)){
          sameLoggedProfile = true;
        }
        else{
          sameLoggedProfile = false;
        }

        console.log(sameLoggedProfile)
        resp.render('profile',{
          layout: 'index',
          title: 'Wavelength • '+ username,
          isLogged: isLogged,
          user : profile,
          post_data: posts,
          comment_data: comments,
          liked_posts: liked_posts,
          sameLoggedProfile: sameLoggedProfile
      }); 
      });   
      }).catch(errorFn);
      }).catch(errorFn);
      }).catch(errorFn); 
    });


    //EDIT PROFILE
    server.post('/edit-profile/:username', function(req, resp){
      const username = req.params.username;
      profileController.getUserInstance(username).then(profile => {
        profile.username = req.body.username;
        profile.bio = req.body.bio;
        profile.user_image = req.body.user_image;
        profile.header_image = req.body.header_image;
        profile.save().then(result => {
          resp.redirect(`/profile-${profile.username}`);
        });
      });
    });


    //EDIT POST PAGE
    server.get('/edit-post/:postID', async (req, resp) => {
      const postID = req.params.postID;
      const post_data = await postController.getPostById(postID);

      resp.render('edit-post', {
        layout: 'editpost_layout',
        title: 'Wavelength • Edit Post',
        post_data: post_data
      });
    });

    server.post('/update-post/:postID', function(req, resp){
      const postID = req.params.postID;
      postController.getPostInstance(postID).then(post => {
        post.title = req.body.title;
        post.postText = req.body.postText;
        post.rating = Number(req.body.rating);
        post.edited = true;
        post.save().then(result => {
          resp.redirect(`/${post.trackName}-${post._id}`);
        });
      });
    });


    //DELETE POST PAGE
    server.get('/delete-post/:postID', async (req, resp) => {
      const postID = req.params.postID;
      const post_data = await postController.getPostById(postID);

      resp.render('delete-post', {
        layout: 'editpost_layout',
        title: 'Wavelength • Delete Post',
        post_data: post_data
      });
    });

    server.post('/deleted-post/:postID', function(req, resp){
      const postID = req.params.postID;
      postController.getPostInstance(postID).then(post => {
        post.deleted = true
        post.save().then(result => {
          resp.redirect(`/profile-${post.user}`);
        });
      });
    });


    //EDIT COMMENT PAGE
    server.get('/edit-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentById(commentID);

      resp.render('edit-comment', {
        layout: 'editpost_layout',
        title: 'Wavelength • Edit Comment',
        comment: comment
      });
    });

    server.post('/update-comment/:commentID', function(req, resp){
      const commentID = req.params.commentID;
      commentController.getCommentInstance(commentID).then(comment => {
        comment.commentText = req.body.commentText
        comment.edited = true;
        comment.save().then(result => {
          resp.redirect(`/profile-${comment.username}`);
        });
      });
    });


    //DELETE COMMENT PAGE
    server.get('/delete-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentById(commentID);

      resp.render('delete-comment', {
        layout: 'editpost_layout',
        title: 'Wavelength • Delete Comment',
        comment: comment
      });
    });

    server.post('/deleted-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentInstance(commentID);
      comment.deleted = true;
      await postController.removeCommentFromPost(commentID);
      await comment.save();
      resp.redirect(`/profile-${comment.username}`);
    });

    
    // ARTIST PAGE
    /*
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
    */

    server.get('/artist-page/:artist-:id', async (req, resp) => { // /artist-page/:artist_name
      const id = req.params.id;
      albumController.getArtistName(id).then(artist => {
        artistController.getArtistGenres(id).then(genres => {
          albumController.getArtistPicture(id).then(image => {
            postController.getAllPosts().then(posts => {
              artistController.getArtistAlbums(id, posts).then(albums => {
                resp.render('artist', {
                  layout: 'artistpage_layout',
                  title: 'Wavelength • ' + artist,
                  artistname: artist,
                  artistImg: image,
                  genres: genres,
                  albums: albums,
                  isLogged: isLogged,
                  user: loggedUser
                });
              });
            });
          });
        }); 
      }); 
    });


    //ALBUM PAGE
    server.get("/album-:albumname([a-zA-Z0-9,.;:_'\\s-]*)-:id", function(req, resp){
      const albumname = req.params.albumname;
      const id = req.params.id;
      postController.getAllPosts().then(posts => {
        albumController.getAlbumData(id, posts).then(data => {
          var reviews = postController.getAlbumReviews(id, posts);
            resp.render('album', {
              layout: 'albumpage_layout',
              title: 'Wavelength • '+ albumname,
              albumData: data,
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
      req.session.destroy(function(err) {
        resp.redirect('/');
      });
      console.log(req.session);
    })

    var cover = 'https://via.placeholder.com/150';
    var artist = "Artist";
    var name = "Track Name";
    var albumLink = "";

    server.post('/getAlbumData', (req, resp) => {
      const albumUrl = req.body.url;
      albumController.getAlbumCover(albumUrl).then(albumData => {
        albumController.getAlbumArtist(albumUrl).then(artistData =>{
          albumController.getAlbumName(albumUrl).then(albumName => {
            console.log("album name: ", albumName);
            resp.send({cover: albumData, artist: artistData, name: albumName});
            cover = albumData;
            artist = artistData;
            name = albumName;
            albumLink = albumUrl;
          });
        });
      });
    });

    // CREATE POST
    server.get('/createpost', (req, resp) => {
      //console.log('albumData:', albumData);
      resp.render('createpost', { 
        layout: 'createpost_layout',
        title: 'Create Post', 
        isLogged: isLogged,
        user: loggedUser,
        albumData: 'https://via.placeholder.com/150',
        artist: "Artist",
        name: "Track Name"
      }); 
    });

    server.post('/createpost', async (req, resp) => {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const date = new Date();
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();

      var albumId = albumLink.replace("https://open.spotify.com/album/", "");
      const artistId = await albumController.getAlbumArtistId(albumId);
      const fullDate = month + " " + day + ", " + year;
      try {

        const tags = req.body.tags.split(',').map(tag => tag.trim());

          const postData = {
              trackName: name,
              artist: artist,
              title: req.body.title,
              postText: req.body.postText,
              rating: parseInt(req.body.rate, 10),
              cover: cover,
              user: loggedUser.username,
              reviewDate: fullDate,
              albumId: albumId,
              artistId: artistId,
              deleted: false,
              edited: false,
          };

          for (let i = 0; i < Math.min(tags.length, 3); i++) {
            postData['tag' + (i + 1)] = tags[i];
        }
  
          const newPost = new Model.postModel(postData);
            
          const savedPost = await newPost.save();
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
          commentController.getAllComments().then(comments => {
            commentController.getPostComments(postID, comments).then(postComments => {
              var pComments = [];
              if (postComments.length) {
                pComments = postComments[0].comments
              }
              console.log(postComments);
              resp.render('viewpost',{
              layout: 'comment_layout',
              title: 'Wavelength • View Post',
              isLogged: isLogged,
              user: loggedUser,
              userpost : profile,
              post_data: post,
              comments: pComments
            }); 
            });
          }).catch(errorFn);
        }).catch(errorFn);
      }).catch(errorFn); 
    });
  }

module.exports.add = add;