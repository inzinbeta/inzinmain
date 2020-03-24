const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const howitworksSchema=new Schema({


    date:{
        type:Date,
        default: Date.now
    },
    imagelogo:String, // percategory one icon
    landingurl:String,
    content:String




});

module.exports = mongoose.model('howitworks', howitworksSchema);