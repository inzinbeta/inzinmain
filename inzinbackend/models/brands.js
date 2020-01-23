const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const brandSchema=new Schema({

   
    imagelogo:String, // percategory one icon
    imagesidebar:String,
    name:String,
    brand:String,
    title:String, // to be inserted in meta_tag
    heading:String,
    brandcategory:{
        type:String,
       
    },
    description:String, // to be shown on particular page of category
    content:String,
    keywords:String,
   

});

module.exports = mongoose.model('brand', brandSchema);