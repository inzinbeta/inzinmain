const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const categoriesSchema= new Schema({


    photo_icon:String, // percategory one icon
    category_name:String,
    seo_title:String, // to be inserted in meta_tag
    seo_heading:String,
    seo_slug:String,
    seo_category_Description:String, // to be shown on particular page of category
    page_content:String,
    seo_keywords:String,
    isParent:Boolean,
    subcategories:[
        {
            photo_icon:String, // percategory one icon
            category_name:String,
            seo_title:String, // to be inserted in meta_tag
            seo_heading:String,
            seo_slug:String,
            seo_category_Description:String, // to be shown on particular page of category
            seo_keywords:String,
            isParent:Boolean,
            parentCategory:String

        }
  

    ]



});

module.exports = mongoose.model('categories', categoriesSchema);