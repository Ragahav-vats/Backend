const express = require('express');
const { create, view, details, update, chnageStatus, destroy } = require('../../controllers/admin/default.controllers');

var router = express.Router();

 module.exports = server => {

    router.post('/create', create);
    router.post('/view', view);
    router.post('/details', details);
    router.post('/update', update);
    router.post('/change-status', chnageStatus);
    router.post('/destroy', destroy);

    server.use('/api/admin/default',router);
}