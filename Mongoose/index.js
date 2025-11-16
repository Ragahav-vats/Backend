const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


// To make Executable Function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());
server.use(cors());

server.get('/',(request,response) => {
    response.send('<h1>server is working..</h1>');
})

// Admin URL

require('./src/routes/admin/default.routes')(server);

// Application URL


// Website URL


server.listen(5000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/monsta_online')
  .then(() => console.log('Connected!'))
  .catch((error) => {
    console.log(error);
  })
    console.log('server is working fine...');
})