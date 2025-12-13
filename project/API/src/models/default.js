const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
  name: {
    type : String,
    default : '',
    required : [true,'Name is required'],
    match: /^[a-zA-Z ]{2,25}$/,
    validate: {
      validator: async function(v) {
        const user = await this.constructor.findOne({ name: v, deleted_at : null });
        return !user;
      },
      message: props => `The specified username is already in use.`
}
    // minLength : [4,'Minimum length must be greather than 4'],
    // maxLength : [15,'Maximum length must be less than 15']
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

const defaultModel = mongoose.model('defaults', defaultSchema);

module.exports = defaultModel;

