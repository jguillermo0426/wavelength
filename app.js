// npm i dotdotdot-js express express-handlebars body-parser mongoose 
const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');

server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: require('./public/common/helpers')
}));
server.set('view engine', 'hbs');

server.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wavelength_group:wavelength@wavelength.gszzu7l.mongodb.net/wavelength');

const controllers = ['routes'];
for(var i=0; i<controllers.length; i++){
  const controller = require('./controllers/'+controllers[i]);
  controller.add(server);
}

function finalClose(){
  console.log('Close connection at the end!');
  mongoose.connection.close();
  process.exit();
}

process.on('SIGTERM',finalClose);  //general termination signal
process.on('SIGINT',finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

const port = process.env.PORT | 3000;
server.listen(port, function(){
  console.log('Listening at port '+port);
});
