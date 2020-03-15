const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const categoriesSchema= new Schema({
    imagelogo:String, // percategory one icon
    imagesidebar:String,
    name:String,
    slug:[String],

    parentcategory:{
        type:String,
        default:"NA"
    },
    description:String, // to be shown on particular page of category

    isParent:Boolean,

    seo_keywords:String,
    seo_metadescription:String,
    seo_metatitle: String,
    seo_metaheading: String,
    seo_metaheadingdescription: String,



});


module.exports = mongoose.model('categories', categoriesSchema);