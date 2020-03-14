const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const categoriesSchema= new Schema({


    imagelogo:String, // percategory one icon
    imagesidebar:String,
    name:String,
    brands:[String],
    metatitle:String, // to be inserted in meta_tag
    heading:String,
    parentcategory:{
        type:String,
        default:"NA"
    },
    description:String, // to be shown on particular page of category
    content:String,
    keywords:String,
    isParent:Boolean,
    seo_keywords:String,
    seo_metadescription:String,
    seo_metatitle: String,
    seo_metaheading: String,
    seo_metaheadingdescription: String,



});

module.exports = mongoose.model('categories', categoriesSchema);