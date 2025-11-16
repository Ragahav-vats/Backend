const express = require('express');
const validation = require('./middleware.js');
const { categories, brands } = require('./controller/APIController.js');

const server = express();

const route = express.Router();
route.use(validation);

server.get('/', (request,response) => {
    response.send('server is started');
});



server.get('/categories', validation, categories);

route.get('/brands', brands);

server.use('/', route);

server.listen(5000, () => {
    console.log('server is working');
})