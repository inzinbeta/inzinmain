const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const brandSchema=new Schema({

    brand_img:String,//
    brand:String,//
    seo_heading:String,//
    seo_title:String,//
    content:String,//
    seo_keywords:String,
    seo_slug:String,//
    seo_description:String,//
    parentcategory:String,//
   // business_partner:[ ],
    states:[String],//
    districts:[{_state:String,_district:String}], // storing respective state with district//
    slug:String,//
    investment:String,
    business_exp:String,
    sizes:String,


});

module.exports = mongoose.model('brand', brandSchema);