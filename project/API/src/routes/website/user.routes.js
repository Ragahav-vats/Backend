let express = require("express")
const multer  = require('multer');
const { register, Login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword,   } = require("../../controllers/website/user.controllers");
const upload = multer({ dest: 'uploads/users' })


var router = express.Router();

 module.exports = server => {

      router.post('/register', upload.none(), register);
      router.post('/login', upload.none(), Login);
      router.post('/view-profile', upload.none(), viewProfile);
      router.put('/update-profile',  upload.none(),updateProfile);
      router.put('/change-password',  upload.none(),changePassword);
       router.post('/forgot-password',  upload.none(),forgotPassword);
      router.post('/reset-password', upload.none(), resetPassword);
    // router.post('/details/:id',  upload.none(),details);
    // router.post('/change-status',  upload.none(),changeStatus);
    // router.post('/destroy', upload.none(), destroy);

    server.use('/api/website/users',router);
 }