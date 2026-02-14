const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
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

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;


