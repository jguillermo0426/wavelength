// npm i dotdotdot-js
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

mongoose.connect('mongodb://localhost:27017/wavelength');

const controllers = ['routes'];
for(var i=0; i<controllers.length; i++){
  const controller = require('./controllers/'+controllers[i]);
  controller.add(server);
}

const port = process.env.PORT | 3000;
server.listen(port, function(){
  console.log('Listening at port '+port);
});
