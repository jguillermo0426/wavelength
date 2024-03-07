const postController = require('./post_controller')

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
  }

module.exports.add = add;