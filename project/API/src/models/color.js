const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,15}$/,
    validate: {
      validator: async function(v) {
        const user = await this.constructor.findOne({ name: v, deleted_at : null });
        return !user;
      },
      message: props => `The specified username is already in use.`
}
  },
  code : {
    type : String,
    required :  [true,'Code is required'],
    default : ''
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
  
});

const colorModel = mongoose.model('colors', colorSchema);

module.exports = colorModel;


