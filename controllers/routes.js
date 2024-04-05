const postController = require('./post_controller');
const profileController = require('./profile_controller');
const commentController = require('./comment_controller');
const artistController = require('./artist_controller');
const albumController = require('./album_controller');
const Model = require('../models/site_model');
const { trusted } = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
var showdown  = require('showdown');
var converter = new showdown.Converter({'underline': 'true', 'strikethrough': 'true'});

const bcrypt = require('bcrypt');

const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

const LastFmApi = require('lastfm-api-client');
const LastFmClient = new LastFmApi({
    apiKey   : 'a51f36830a90a1c82caa90049def47a9',
    apiSecret: '3f887f343ced4c2dc34d1502e7887384'
});


function errorFn(err){
  console.log('Error found. Please trace!');
  console.error(err);
}
/*
  To Do List ( "*" - done ; ">" = to be accomplished):  
    * Sign Up functionality
      * checking database for availability of username
      * Adding new user to database
    * Password hashing
    > remember session function (test nalang if goods na)
    * Home page
      * Like and dislike functionality
      * Comment functionality (can be redirection to view full post page)
      * Recent and Popular functionality
    > Sign up or log-in prompt (for unlogged user when trying to upvote, downvote, or comment)
    * Search Functionality
      * Searching posts 
      * Limit search with tags
    * Profile Page functionality (edit and delete functions should only be visible to logged user):
      * Edit Profile functionality
      * Edit Post functionality
      * Delete Post functionality
      * Edit Comment Functionality
      * Delete Comment Functionality
    > Artists Page 
      * Genres tag (get most popular genre tags for that artist)
      > Reviews average aggregate (get total number of reviews for that album)
      > Average score aggregate (get average score for that album
    * Album Page
      * Average Ratings aggregate
      * Make reviews in album page link to full post of review
    * Create Post Page
      * Search Album Pop-up (must list albums available in database and have ability to search for specific album)
      * Add tags
      * Markdown (optional for bonus points)
      * Search tag popup
      * Submit post 
    > View Full Post Page
        > comment function
        > nested comments
        > liking and disliking other comments  
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
      cookie: {},
      store: new mongoStore({ 
        uri: mongo_uri,
        collection: 'mySession'
      })
    }));


    //HOMEPAGE
    server.get('/', function(req, resp){
      postController.getAllPosts().then(posts => {
        postController.markdownPosts(posts);
        console.log(req.session);
        var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }
        //console.log(posts);
        resp.render('main', {
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

 
    // POSTS LIKES
    server.post('/like-dislike', function(req, resp){
      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }
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


    //COMMENTS DATA
    server.post('/comment-like-dislike', function(req, resp){
      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }
      if (isLogged === true) {
        var commentId = req.body.commentId; 
        var liked = false;
        var disliked = false;
        var match = false;
        commentController.getCommentById(commentId).then(comment => { 
          commentController.getCommentLikes(comment.likes).then(commentLikes => {
            commentController.getCommentDislikes(comment.dislikes).then(commentDislikes => {
              if (comment.likes.length || comment.dislikes.length) {
                if (commentLikes && commentLikes._id.toString() === loggedUser._id.toString()) {
                  liked = false; // Unlike
                  disliked = true;
                  console.log("comment: ", commentId, '1', liked, disliked);
                }
                else if (commentLikes && commentLikes._id.toString() != loggedUser._id.toString() && commentDislikes && commentDislikes._id.toString() != loggedUser._id.toString()) {
                  liked = true; // Like
                  disliked = true;
                  console.log("comment: ", commentId, '2', liked, disliked);
                } 
                else if (commentDislikes && commentDislikes._id.toString() === loggedUser._id.toString()) {
                  disliked = false;
                  liked = true;
                  console.log("comment: ", commentId, '5', liked, disliked);
                }
                else {
                  liked = true; // Like
                  disliked = true;
                  console.log("comment: ", commentId, '8', liked, disliked);
                }
              }
              else {
                liked = true; // Like
                disliked = true;
                console.log("comment: ", commentId, '3', liked, disliked);
              }
    
              if (req.body.type === 'clicked') {
                console.log("id: ", comment._id);
                if (liked === false) {
                  Model.commentModel.findOneAndUpdate({_id: comment._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                    if (disliked === true && req.body.click === 'dislike') {
                      Model.commentModel.findOneAndUpdate({_id: comment._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                        resp.send({
                          liked: liked,
                          likes: comment.likes.length,
                          disliked: disliked,
                          dislikes: comment.dislikes.length,
                          match: match
                        });
                        console.log('disliked 2');
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: comment.likes.length,
                        disliked: disliked,
                        dislikes: comment.dislikes.length,
                        match: match
                      });
                      console.log('unliked 2');
                    }
                  }).catch(errorFn);
                }
                else if (liked === true && req.body.click === 'like') {
                  Model.commentModel.findOneAndUpdate({_id: comment._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                    if (disliked === false) {
                      Model.commentModel.findOneAndUpdate({_id: comment._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                        resp.send({
                          liked: liked,
                          likes: comment.likes.length,
                          disliked: disliked,
                          dislikes: comment.dislikes.length,
                          match: match
                        });
                        console.log('undisliked 1');
                      }).catch(errorFn);
                    }
                    else if (disliked === true) {
                      resp.send({
                        liked: liked,
                        likes: comment.likes.length,
                        disliked: disliked,
                        dislikes: comment.dislikes.length,
                        match: match
                      });
                    console.log('liked 1');
                    }
                  }).catch(errorFn);
                }
                else if (disliked === false) {
                  Model.commentModel.findOneAndUpdate({_id: comment._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                    if (liked === false) {
                      Model.commentModel.findOneAndUpdate({_id: comment._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                        resp.send({
                          liked: liked,
                          likes: comment.likes.length,
                          disliked: disliked,
                          dislikes: comment.dislikes.length,
                          match: match
                        });
                        console.log("liked 2");
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: comment.likes.length,
                        disliked: disliked,
                        dislikes: comment.dislikes.length,
                        match: match
                      });
                      console.log('undisliked 2');
                    }
                  }).catch(errorFn);
                }
                else if (disliked === true) {
                  Model.commentModel.findOneAndUpdate({_id: comment._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                    if (liked === false) {
                      Model.commentModel.findOneAndUpdate({_id: comment._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                        resp.send({
                          liked: liked,
                          likes: comment.likes.length,
                          disliked: disliked,
                          dislikes: comment.dislikes.length,
                          match: match
                        });
                        console.log('unliked 1');
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: comment.likes.length,
                        disliked: disliked,
                        dislikes: comment.dislikes.length,
                        match: match
                      });
                    console.log('disliked 1');
                    }
                  }).catch(errorFn);
                }
                console.log('\n');
              }
              else if (req.body.type === 'load') {
                resp.send({liked: liked, disliked: disliked, id: comment._id});
              }
            });
          }); 
        });
      }
      else {
        resp.send({output: "nouser"});
      }
    });

    server.post('/reply-like-dislike', function(req, resp){
      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }
      if (isLogged === true) {
        var replyId = req.body.replyId; 
        var liked = false;
        var disliked = false;
        var match = false;
        commentController.getReplyById(replyId).then(reply => { 
          commentController.getReplyLikes(reply.likes).then(replyLikes => {
            commentController.getReplyDislikes(reply.dislikes).then(replyDislikes => {
              if (reply.likes.length || reply.dislikes.length) {
                if (replyLikes && replyLikes._id.toString() === loggedUser._id.toString()) {
                  liked = false; // Unlike
                  disliked = true;
                  //console.log("comment: ", commentId, '1', liked, disliked);
                }
                else if (replyLikes && replyLikes._id.toString() != loggedUser._id.toString() && replyDislikes && replyDislikes._id.toString() != loggedUser._id.toString()) {
                  liked = true; // Like
                  disliked = true;
                  //console.log("comment: ", commentId, '2', liked, disliked);
                } 
                else if (replyDislikes && replyDislikes._id.toString() === loggedUser._id.toString()) {
                  disliked = false;
                  liked = true;
                  //console.log("comment: ", commentId, '5', liked, disliked);
                }
                else {
                  liked = true; // Like
                  disliked = true;
                  //console.log("comment: ", commentId, '8', liked, disliked);
                }
              }
              else {
                liked = true; // Like
                disliked = true;
                //console.log("comment: ", commentId, '3', liked, disliked);
              }
    
              if (req.body.type === 'clicked') {
                if (liked === false) {
                  Model.replyModel.findOneAndUpdate({_id: reply._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                    if (disliked === true && req.body.click === 'dislike') {
                      Model.replyModel.findOneAndUpdate({_id: reply._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                        resp.send({
                          liked: liked,
                          likes: reply.likes.length,
                          disliked: disliked,
                          dislikes: reply.dislikes.length,
                          match: match
                        });
                        console.log('disliked 2');
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: reply.likes.length,
                        disliked: disliked,
                        dislikes: reply.dislikes.length,
                        match: match
                      });
                      console.log('unliked 2');
                    }
                  }).catch(errorFn);
                }
                else if (liked === true && req.body.click === 'like') {
                  Model.replyModel.findOneAndUpdate({_id: reply._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(commentLikes => {
                    if (disliked === false) {
                      Model.replyModel.findOneAndUpdate({_id: reply._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(commentDislikes => {
                        resp.send({
                          liked: liked,
                          likes: reply.likes.length,
                          disliked: disliked,
                          dislikes: reply.dislikes.length,
                          match: match
                        });
                        console.log('undisliked 1');
                      }).catch(errorFn);
                    }
                    else if (disliked === true) {
                      resp.send({
                        liked: liked,
                        likes: reply.likes.length,
                        disliked: disliked,
                        dislikes: reply.dislikes.length,
                        match: match
                      });
                    console.log('liked 1');
                    }
                  }).catch(errorFn);
                }
                else if (disliked === false) {
                  Model.replyModel.findOneAndUpdate({_id: reply._id}, {$pull: {dislikes: new ObjectId(loggedUser._id)}}).then(replyDislikes => {
                    if (liked === false) {
                      Model.replyModel.findOneAndUpdate({_id: reply._id}, {$push: {likes: new ObjectId(loggedUser._id)}}).then(replyLikes => {
                        resp.send({
                          liked: liked,
                          likes: reply.likes.length,
                          disliked: disliked,
                          dislikes: reply.dislikes.length,
                          match: match
                        });
                        console.log("liked 2");
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: reply.likes.length,
                        disliked: disliked,
                        dislikes: reply.dislikes.length,
                        match: match
                      });
                      console.log('undisliked 2');
                    }
                  }).catch(errorFn);
                }
                else if (disliked === true) {
                  Model.replyModel.findOneAndUpdate({_id: reply._id}, {$push: {dislikes: new ObjectId(loggedUser._id)}}).then(replyDislikes => {
                    if (liked === false) {
                      Model.replyModel.findOneAndUpdate({_id: reply._id}, {$pull: {likes: new ObjectId(loggedUser._id)}}).then(replyLikes => {
                        resp.send({
                          liked: liked,
                          likes: reply.likes.length,
                          disliked: disliked,
                          dislikes: reply.dislikes.length,
                          match: match
                        });
                        console.log('unliked 1');
                      }).catch(errorFn);
                    }
                    else {
                      resp.send({
                        liked: liked,
                        likes: reply.likes.length,
                        disliked: disliked,
                        dislikes: reply.dislikes.length,
                        match: match
                      });
                    console.log('disliked 1');
                    }
                  }).catch(errorFn);
                }
                console.log('\n');
              }
              else if (req.body.type === 'load') {
                resp.send({liked: liked, disliked: disliked, id: reply._id});
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
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
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
          postController.markdownPosts(posts);
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
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      profileController.getUserProfile(user).then(function(user_data){
        console.log('Finding user');
        
        if(user_data != undefined && user_data._id != null){
          bcrypt.compare(pass, user_data.password, function(err, result) {
            if(result){
              console.log(user_data);
              isLogged = true;
              loggedUser = user_data;
              req.session.user = {
                user_data: user_data,
                login_id: req.sessionID
              }
              if(remember === 'true'){  
                req.session.cookie.expires = 21*24*1000*60*60;
                console.log(req.session.cookie.expires);
              }
              else {
                console.log(req.session.cookie.expires);
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

      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      profileController.getUserProfile(username).then(profile => {
        const userID = String(profile._id);
        postController.getUserPost(userID).then(posts => {
          commentController.getUserComments(userID).then(comments => {
            profileController.getLikes(profile).then(liked_posts => {
              commentController.getUserReplies(userID).then(replies => {
                postController.markdownPosts(posts);
                postController.markdownPosts(liked_posts);
                sameLoggedProfile = false;
                if(String(loggedUser._id) == String(profile._id)){
                  sameLoggedProfile = true;
                }
                else{
                  sameLoggedProfile = false;
                }
                console.log(replies);
                //console.log(sameLoggedProfile)
                resp.render('profile',{
                  layout: 'index',
                  title: 'Wavelength • '+ username,
                  isLogged: isLogged,
                  user : loggedUser,
                  viewuser: profile,
                  post_data: posts,
                  comment_data: comments,
                  liked_posts: liked_posts,
                  sameLoggedProfile: sameLoggedProfile,
                  replies: replies
                }); 
              });
            });   
          }).catch(errorFn);
        }).catch(errorFn);
      }).catch(errorFn); 
    });


    //EDIT PROFILE
    server.post('/edit-profile/:username', function(req, resp){
      const username = req.params.username;
      const update = {}

      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      profileController.getUserInstance(username).then(profile => {
        profileController.getUserProfile(req.body.username.trim()).then(newProfile => {
          if(newProfile){
            console.log("username already taken!");
            resp.redirect(`/profile-${username}`);
          }
          else{
            if (req.body.username){
              if(req.body.username.trim() != username){
                profile.username = req.body.username.trim();
                update.username = req.body.username.trim();
              }  
            }
            if (req.body.bio){
              profile.bio = req.body.bio;
            }
            if (req.body.user_image){
              profile.user_image = req.body.user_image;
              update.user_image = req.body.user_image;
            }
            if (req.body.header_image){
              profile.header_image = req.body.header_image;
            }
            Object.assign(loggedUser, update);
            profile.save().then(result => {
              resp.redirect(`/profile-${profile.username}`);
            }).catch(err=>{
              resp.status(500).send("Error saving profile");
            });
          } 
        }).catch(err=>{
          resp.status(500).send("Error retrieving user profile");
        });   
      }).catch(err=>{
        resp.status(500).send("Error retrieving user instance");
      });
    });


    //EDIT POST PAGE
    server.get('/edit-post/:postID', async (req, resp) => {
      const postID = req.params.postID;
      const post_data = await postController.getPostById(postID);

      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }

      resp.render('edit-post', {
        layout: 'createpost_layout',
        title: 'Wavelength • Edit Post',
        post_data: post_data,
        isLogged: isLogged,
        user: loggedUser
      });
    });

    server.post('/update-post/:postID', function(req, resp){
      const postID = req.params.postID;
      postController.getPostInstance(postID).then(post => {
        post.title = req.body.title;
        post.postText = req.body.postText;
        post.rating = Number(req.body.rating);
        post.edited = true;

        const tags = req.body.tags.split(',').map(tag => tag.trim());
        post.tag1 = tags[0] || "";
        post.tag2 = tags[1] || "";
        post.tag3 = tags[2] || "";
        post.save().then(result => {
          resp.redirect(`/${post.trackName}-${post._id}`);
        });
      });
    });


    //DELETE POST PAGE
    server.get('/delete-post/:postID', async (req, resp) => {
      const postID = req.params.postID;
      const post_data = await postController.getPostById(postID);

      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }

      resp.render('delete-post', {
        layout: 'createpost_layout',
        title: 'Wavelength • Delete Post',
        post_data: post_data,
        isLogged: isLogged,
        user: loggedUser
      });
    });

    server.post('/deleted-post/:postID', function(req, resp){
      const postID = req.params.postID;
      postController.getPostInstance(postID).then(post => {
        post.deleted = true
        post.save().then(result => {
          resp.redirect('/');
        });
      });
    });


    //EDIT COMMENT PAGE
    server.get('/edit-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentById(commentID);

      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      resp.render('edit-comment', {
        layout: 'createpost_layout',
        title: 'Wavelength • Edit Comment',
        comment: comment,
        isLogged: isLogged,
        user: loggedUser
        
      });
    });

    server.post('/update-comment/:commentID', function(req, resp){
      const commentID = req.params.commentID;
      commentController.getCommentInstance(commentID).then(comment => {
        if (req.body.commentText){
          comment.commentText = req.body.commentText.trim();
          comment.edited = true;
        }
        
        comment.save().then(result => {
          resp.redirect(`/${comment.postId.trackName}-${comment.postId._id}`);
        });
      });
    });


    //DELETE COMMENT PAGE
    server.get('/delete-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentById(commentID);

      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }

      resp.render('delete-comment', {
        layout: 'createpost_layout',
        title: 'Wavelength • Delete Comment',
        comment: comment,
        isLogged: isLogged,
        user: loggedUser
      });
    });

    server.post('/deleted-comment/:commentID', async (req, resp) => {
      const commentID = req.params.commentID;
      const comment = await commentController.getCommentInstance(commentID);
      comment.deleted = true;
      await postController.removeCommentFromPost(commentID);
      await comment.save();
      resp.redirect(`/${comment.postId.trackName}-${comment.postId._id}`);
    });


    //EDIT REPLY PAGE
    server.get('/edit-reply/:replyID', async (req, resp) => {
      const replyID = req.params.replyID;
      const reply = await commentController.getReplyById(replyID);

      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      resp.render('edit-reply', {
        layout: 'createpost_layout',
        title: 'Wavelength • Edit Reply',
        reply: reply,
        isLogged: isLogged,
        user: loggedUser
        
      });
    });

    server.post('/update-reply/:replyID', function(req, resp){
      const replyID = req.params.replyID;
      commentController.getReplyInstance(replyID).then(reply => {
        if(req.body.replyText){
          reply.replyText = req.body.replyText.trim();
          reply.edited = true;
        }
        
        reply.save().then(result => {
          resp.redirect(`/${reply.postId.trackName}-${reply.postId._id}`);
        });
      });
    });


    //DELETE REPLY PAGE
    server.get('/delete-reply/:replyID', async (req, resp) => {
      const replyID = req.params.replyID;
      const reply = await commentController.getReplyById(replyID);

      var isLogged;
        var loggedUser = [];
        if (req.session.user) {
          loggedUser = req.session.user.user_data;
          isLogged = true;
        }

      resp.render('delete-reply', {
        layout: 'createpost_layout',
        title: 'Wavelength • Delete Reply',
        reply: reply,
        isLogged: isLogged,
        user: loggedUser
      });
    });

    server.post('/deleted-reply/:replyID', async (req, resp) => {
      const replyID = req.params.replyID;
      const reply = await commentController.getReplyInstance(replyID);
      reply.deleted = true;
      await commentController.removeReply(replyID);
      await postController.removeReply(replyID);
      await reply.save();
      resp.redirect(`/${reply.postId.trackName}-${reply.postId._id}`);
    });

    server.get('/artist-page/:artist-:id', async (req, resp) => { // /artist-page/:artist_name
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      const id = req.params.id;
      albumController.getArtistName(id).then(artist => {
        artistController.getArtistGenres(id).then(genres => {
          albumController.getArtistPicture(id).then(image => {
            postController.getAllPosts().then(posts => {
              artistController.getArtistAlbums(id, posts).then(albums => {
                LastFmClient.artist.getInfo({artist: artist}).then((lfmresponse) => {
                  console.log(lfmresponse);
                  resp.render('artist', {
                    layout: 'artistpage_layout',
                    title: 'Wavelength • ' + artist,
                    artistname: artist,
                    artistImg: image,
                    genres: genres,
                    albums: albums,
                    isLogged: isLogged,
                    user: loggedUser,
                    bio: lfmresponse.artist.bio.summary 
                  });
                })
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

      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
      postController.getAllPosts().then(posts => {
        albumController.getAlbumData(id, posts).then(data => {
          postController.markdownPosts(posts);
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
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
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
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
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
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const date = new Date();
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();
      const time = date.getTime();

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
              userId: loggedUser._id,
              tag1: "",
              tag2: "",
              tag3: "",
              timeReviewed: time
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
    server.get("/:title([a-zA-Z0-9,.;:_'\\s-]*)-:postID", function(req, resp){
      const postID = req.params.postID;
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }

      postController.getPostById(postID).then(post => {
        if(post.deleted){
          resp.render('deleted-post', {
            layout: 'createpost_layout',
            title: 'Wavelength • Deleted Post',
            isLogged: isLogged,
            user: loggedUser
          });
        }
        else{
          profileController.getProfileByPost(postID).then(profile => {
            postController.getPostById(postID).then(post => {
              commentController.getAllComments().then(comments => {
                commentController.getPostComments(postID, comments).then(postComments => {
                  var text = post.postText;
                  var html = converter.makeHtml(text);
                  post.markdown = html;
                  var pComments = [];
                  if (postComments.length) {
                    pComments = postComments;
                  }
                  commentController.getPostReplies(postID).then(reply => {
                    resp.render('viewpost',{
                      layout: 'comment_layout',
                      title: 'Wavelength • View Post',
                      isLogged: isLogged,
                      user: loggedUser,
                      userpost : profile,
                      post_data: post,
                      comments: pComments,
                      reply: reply,
                      totalReplies: reply.length
                    }); 
                  });
                });
              }).catch(errorFn);
            }).catch(errorFn);
          }).catch(errorFn); 
        }
      });
      
    });

    // CREATE COMMENT
    server.post("/create-comment", async (req, resp) => {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var isLogged;
      var loggedUser = [];
      if (req.session.user) {
        loggedUser = req.session.user.user_data;
        isLogged = true;
      }
      const date = new Date();
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();
      const time = date.getTime();
  
      const fullDate = month + " " + day + ", " + year;

      const postId = req.body.postId;
      try {
          const commentData = {
              commentText: req.body.commentText,
              postId: postId,
              edited: false,
              deleted: false,
              userId: loggedUser._id,
              commentDate: fullDate,
              timeCommented: time,
          };
          
          const newComment = new Model.commentModel(commentData);
          const savedComment = await newComment.save();
  
          const post = await Model.postModel.findById(postId);
          if (!post) {
              return resp.status(404).json({ error: 'Post not found' });
          }
          post.comments.push(savedComment._id);
          await post.save();
          
          resp.send({action: 'redirect'});
      } catch (error) {
          resp.status(500).send('Error creating comment: ' + error.message);
      }
  
  });

  
  // CREATE REPLY
  server.post("/create-reply", async (req, resp) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var isLogged;
    var loggedUser = [];
    if (req.session.user) {
      loggedUser = req.session.user.user_data;
      isLogged = true;
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const time = date.getTime();

    const fullDate = month + " " + day + ", " + year;

    const postId = req.body.postId;
    const commentId = req.body.commentId
    try {
        const replyData = {
            replyText: req.body.replyText,
            postId: postId,
            edited: false,
            deleted: false,
            userId: loggedUser._id,
            replyDate: fullDate,
            timeCommented: time,
            commentId: commentId
        };
        
        console.log(req.body.replyText);
        const newReply = new Model.replyModel(replyData);
        const savedReply = await newReply.save();
  
        const post = await Model.postModel.findById(postId);
        if (!post) {
            return resp.status(404).json({ error: 'Post not found' });
        }

        const comment = await Model.commentModel.findById(commentId);
        if (!comment) {
            return resp.status(404).json({ error: 'Comment not found' });
        }
   
        post.replies.push(savedReply._id);
        await post.save();
        comment.replies.push(savedReply._id);
        await comment.save();

        resp.send({action: 'redirect'});

    } catch (error) {
        resp.status(500).send('Error creating comment: ' + error.message);
    }

  });

  }

module.exports.add = add;