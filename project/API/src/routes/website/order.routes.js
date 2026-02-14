let express = require("express")
const multer  = require('multer');
const { placeOrder, changeStatus  } = require("../../controllers/website/order.controllers");
const upload = multer({ dest: 'uploads' })


var router = express.Router();

 module.exports = server => {

      router.post('/place-order', upload.none(), placeOrder);
      router.post('/change-status', upload.none(), changeStatus);
      

    server.use('/api/website/orders',router);
 }