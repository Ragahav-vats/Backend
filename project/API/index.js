const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv').config();


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

server.use('/uploads/colors', express.static('uploads/colors'));
server.use('/uploads/categories', express.static('uploads/categories'));
server.use('/uploads/products', express.static('uploads/products'));

// Admin URL

require('./src/routes/admin/default.routes')(server);
require('./src/routes/admin/material.routes')(server);
require('./src/routes/admin/color.routes')(server);
require('./src/routes/admin/category.routes')(server);
require('./src/routes/admin/product.routes')(server);
require('./src/routes/admin/subCategory.routes')(server);
require('./src/routes/admin/subSubCategory.routes')(server);
// Application URL


//Website URL
require('./src/routes/website/user.routes')(server);
require('./src/routes/website/order.routes')(server);



server.listen(process.env.PORT, () => {
    mongoose.connect(`${process.env.mongoDb}`)
  .then(() => console.log('Connected!'))
  .catch((error) => {
    console.log(error);
  })
    console.log('server is working fine...');
})