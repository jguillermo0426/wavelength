const postController = require('./post_controller');
const profileController = require('./profile_controller');
const commentController = require('./comment_controller');
const likeController = require('./like_controller');

function errorFn(err){
  console.log('Error found. Please trace!');
  console.error(err);
}

var loggedUser = [];
var isLogged = false;
/*
  To Do List ( "*" - done ; ">" = to be accomplished):  
    * Sign Up Page (functionality to be accomplished)
    > Artists Page
    > Album Page
    * Create Post Page
      > Search Album Pop-up (must list albums available in database and have ability to search for specific album)
      > List of tags (dunno if need na sa MCO2)
    > View Full Post Page
    > Add navigation menu in navigation bar 
      > (to include view all artists)
      > tas nakalimutan ko na kung ano pa pwede ilagay
      > log-out (when a user is logged in)
    * Profile Page:
      * Edit Profile Pop-up 
      * Triple dot feature (for editing and deleting own posts and comments)
    * Home Page

       
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
        //console.log(liked_posts);
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
    server.get('/profile-:artist_name')

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
            //console.log(posts);
            resp.render('viewpost',{
              layout: 'comment_layout',
              title: 'Wavelength • View Post',
              isLogged: isLogged,
              user : profile,
              post_data: post,
              comment_data: comments
            }); 
          }).catch(errorFn);
        }).catch(errorFn);
      }).catch(errorFn); 
    });
  }

module.exports.add = add;