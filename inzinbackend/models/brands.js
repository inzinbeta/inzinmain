const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const brandSchema=new Schema({



    name:String,
    brandcategory:String,
    slug: String,
    tags:[String],
    parentcategory: String,
    subcategory:String,

    keywords: String,
    description:String,
    specifications: [],
    seo_keywords: String,
    seo_metadescription: String,
    seo_metatitle: String,
    seo_metaheading: String,
    seo_metaheadingdescription: String,
    mobile: String,
    address:String,
    email: String,
    web: String,
    socialmedia: String,
    //Requirements
    cnf: String,
    cnfarea: String,
    cnfinvestment: String,
    cnfsalesteam: String,
    distributor: String,
    distributorarea: String,
    distributorinvestment: String,
    distributorsalesteam: String,
    ////
    dealer: String,
    dealerarea:String,
    dealerinvestment:String,
    dealersalesteam: String,
    workshop: String,
    workshoparea:String,
    workshopinvestment:String,
    workshopsalesteam:String,
    imagelogo:String, // percategory one icon
    imagesidebar:String,




});

module.exports = mongoose.model('brand', brandSchema);