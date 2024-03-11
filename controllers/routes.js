const postController = require('./post_controller');
const profileController = require('./profile_controller');
const commentController = require('./comment_controller');

function errorFn(err){
  console.log('Error found. Please trace!');
  console.error(err);
}


function add(server){
    server.get('/', function(req, resp){
      postController.getAllPosts().then(posts => {
        resp.render('main',{
          layout: 'index',
          title: 'Wavelength • Home',
          post_data: posts
        }); 
      
      }).catch(err => {
          console.error('Error occurred while getting posts:', err);
      });
    });

    //PROFILE PAGE
    server.get('/profile', function(req, resp){
      const username = "hannipham";

      profileController.getProfile(username).then(profile => {
        postController.getUserPosts(username).then(posts => {
          commentController.getUserComments(username).then(comments => {
            resp.render('profile',{
              layout: 'profile_layout',
              title: 'Wavelength • Profile',
              profile_data: profile,
              post_data: posts,
              comment_data: comments
            }); 
          }).catch(errorFn);
        }).catch(errorFn);
      }).catch(errorFn);
    });
  }

module.exports.add = add;