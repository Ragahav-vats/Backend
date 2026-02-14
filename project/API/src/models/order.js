const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id : {
    type : String,
    required : [true, 'User Id is require' ],
    default : '',
    ref : 'users'
  },
  order_id : {
    type : String,
    default : '',
  },
   order_number : {
    type : String,
    default : '',
  },
  payment_id : {
    type : String,
    default : '',
  },
  order_date : {
    type : Date,
    default : Date.now(),
  }, 
  billing_address : {
    type : Object,
    required : [true, 'Billing Address is required']
  },
  shipping_address : {
    type : Object,
    required : [true, 'Shipping Address is required']
  },
   product_info : {
    type : Array,
    required : [true, 'Product Details is required']
  },
   total_amount : {
    type : Number,
    required : [true, 'Total Amount is require' ],
    default : '',
  },
   discount_amount : {
    type : Number,
    required : [true, 'Discount Amount is require' ],
    default : '',
  },
   net_amount : {
    type : Number,
    required : [true, 'Net Amount is require' ],
    default : '',
  },
  order_status : {
    type: Number,
    default : 1, // 1 - Order Placed 2 - Order Received 3 - Ready To Shipping 4 - Order Dispatch 5 - Order Complete 6 - Order Cancel 7 - Order Failed
  },
   payment_status : {
    type: Number,
    default : 1, // 1 - Order Pending 2 - Order Complete 3 - Cancel/Failed
  },
  name: {
    type : String,
    default : '',
    // required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,15}$/,
  },
  email: {
    type : String,
    default : '',
    required : [true,'Email is required'],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
    validate: {
    validator: async function(v) {
    const user = await this.constructor.findOne({ email: v, deleted_at : null, role_type: 'user' });
        return !user;
      },
      message: props => `The specified Email is already in use.`
}
  },
  mobile_number : {
    type : Number,
    default : ''
  },
  password : {
    type : String,
    required :  [true,'password is required'],
    default : ''
  },
  address : {
    type : String,
    default : ''
  },
  gender : {
    type : String,
    default : ''
  },
  role_type : {
    type : String,
    enum : ['user','admin'],
    required :  [true,'Role Type is required'],
    default : 'user'
  },
  status : {
    type : Boolean,
    default : true
  },
  order : {
    type : Number,
    min : [0, 'Minimum value must be greather than 0'],
    max : [1000, 'Minimum value must be greather than 1000'],
    default : 0
  },
  created_at : {
    type : Date,
    default : Date.now()
  },
  updated_at : {
    type : Date,
    default : Date.now()
  },
  deleted_at :{
    type : Date,
    default : ''
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  
});

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;


