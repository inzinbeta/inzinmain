const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const  serviceSchema= new Schema({


title: String,
    description: String,
    seo_keywords: String,
    seo_metadescription: String,
    seo_metatitle:String,
    seo_metaheading: String,
    seo_metaheadingdescription:String,
    imagelogo:String,



});

module.exports = mongoose.model('services', serviceSchema);