const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const avSchema=new Schema({

             brandid:String,
            districts:[],
            status:String,
            brandname:String,





});

module.exports = mongoose.model('availability', avSchema);