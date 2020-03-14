//This collection will hold the pics of all the pages as required


const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const pagesSchema=new Schema({
  
    name:String,
    phonenumber:String,
    email:String,
    date:Date,
    productEnquired:String

   
    });

module.exports = mongoose.model('pages', pagesSchema);