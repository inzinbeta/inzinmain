//This collection will hold the pics of all the pages as required


const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const sectionSchema=new Schema({
  
    name:String,
    date:{type:Date,default:Date.now()},


});

module.exports = mongoose.model('section', sectionSchema);