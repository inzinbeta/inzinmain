const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const siteInfoSchema=new Schema({


    date:{
        type:Date,
        default: Date.now
    },
    name: String,
    title:  String,
    email:  String,
    phone:  String,
    address:  String,
    website: String,
    socialmedia: String,




});

module.exports = mongoose.model('siteinfo', siteInfoSchema);