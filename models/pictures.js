const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const PictureSchema=new Schema({

 type:String,
 url:String,
 uploadDate:{type:Date,default:Date.now()}



});

module.exports = mongoose.model('picture', PictureSchema);