const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  email:String,
  name:String,
  password: {
    type: 'String',
    required: true,
    trim: true
  },
  role: {
    type: 'String',
    required: true,
    trim: true
  },
  isactive: {
    type: 'Boolean',
    required: true,
    trim: true
  },
  address:{
    district: String,
    state:String,
    street: String,
    houseNumber: String
    
  }
});

module.exports = mongoose.model('user', userSchema);