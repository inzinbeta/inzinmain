const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const enquirySchema=new Schema({
  
    name:String,
    phonenumber:String,
    email:String,
    date:Date,
    productEnquired:String

   
    });

module.exports = mongoose.model('enquiry', enquirySchema);