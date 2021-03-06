const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const     productsSchema= new Schema({


    imagelogo:String, // percategory one icon
    tags: [],

    brand: String,
    specifications:[],
    category: String,
    subcategory: [],
    metatitle:String,
    name: String,
    slug: String,
    stock:String,
    description:String,
    seo_keywords:String,
    seo_metadescription: String,
    seo_metatitle: String,
    seo_metaheading:String,
    seo_metaheadingdescription: String,

});

module.exports = mongoose.model('products', productsSchema);