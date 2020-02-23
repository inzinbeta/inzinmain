const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const brandSchema=new Schema({

   
    imagelogo:String, // percategory one icon
    imagesidebar:String,
    brand:String,
    title:String, // to be inserted in meta_tag
    heading:String,
    brandcategory:{
        type:String,
       
    },
    specifications:[],
    description:String, // to be shown on particular page of category
    content:String,
    keywords:String,
    parentcategory:String,
    seo_metatitle:String,
    seo_metadescription:String,
    seo_metaheading:String,
    seo_metaheadingdescription:String,
    seo_keywords:String,
    mobile:String,
    address:String,
    web:String,
    email:String,
    socialmedia:String


});

module.exports = mongoose.model('brand', brandSchema);