let express = require("express")
const { create, view, details, update, changeStatus, destroy} = require('../../controllers/admin/color.controllers');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/categories' })


var router = express.Router();

 module.exports = server => {

    router.post('/create', upload.none(), create);
    router.post('/view', upload.none(), view);
    router.post('/details/:id',  upload.none(),details);
    router.put('/update/:id',  upload.none(),update);
    router.post('/change-status',  upload.none(),changeStatus);
    router.post('/destroy', upload.none(), destroy);

    server.use('/api/admin/colors',router);
 }