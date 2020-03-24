const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const homeSchema=new Schema({


    date:{
        type:Date,
        default: Date.now
    },
    imagelogo:String, // percategory one icon




});

module.exports = mongoose.model('home', homeSchema);