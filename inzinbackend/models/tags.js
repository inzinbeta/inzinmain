<<<<<<< HEAD
 
=======
>>>>>>> 11db318ee8ccd68fc8719cc43cfbd5ac68a6be76
const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const tagsSchema=new Schema({
   description:String, // to be shown on particular page of category
    name:String
   
    });

module.exports = mongoose.model('tags', tagsSchema);