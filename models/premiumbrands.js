const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const premiumbrandSchema=new Schema({

   
    imagelogo:String, // percategory one icon
   
    brand:String,
  
    description:String, // to be shown on particular page of category
   
    parentcategory:String,
   
        cnf:String,
       
        cnfarea:String,
        cnfinvestment:String,
        cnfsalesteam:String,
        distributor:String,
       
        distributorarea:String,
        distributorinvestment:String,
        distributorsalesteam:String,
        dealer:String,
       
        dealerarea:String,
        dealerinvestment:String,
        dealersalesteam:String
   

   

});

module.exports = mongoose.model('premiumbrand', premiumbrandSchema);