const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const     productsSchema= new Schema({


    imagelogo:String, // percategory one icon
    imagesidebar:String,
    name:String,
    tags:[String],
    metatitle:String, // to be inserted in meta_tag
    heading:String,
    parentcategory:{
        type:String,
        default:"NA"
    },
    description:String, // to be shown on particular page of category
    content:String,
    keywords:String,
    isParent:Boolean,
    
   
  });

module.exports = mongoose.model('products', productsSchema);