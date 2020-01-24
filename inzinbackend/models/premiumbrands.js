const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;
const categorySchema=require("../models/categories");

const premiumbrandSchema=new Schema({

   
    imagelogo:String, // percategory one icon
    imagesidebar:String,
    brand:String,
  
    brandcategory:{
        type:String,
       
    },
    description:String, // to be shown on particular page of category
   
    parentcategory:String,
    cnf:{
        name:String,
        salesarea:String,
        investement:String,
        team:String
    },

    distributor:{
        name:String,
        salesarea:String,
        investement:String,
        team:String
    },

    dealer:{
        name:String,
        salesarea:String,
        investement:String,
        team:String
    }
   

});

module.exports = mongoose.model('premiumbrand', premiumbrandSchema);