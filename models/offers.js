const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const     offerSchema= new Schema({


    title: String,
    brand: String,
    description: String,
    imagelogo:String, // percategory one icon


});

module.exports = mongoose.model('offers', offerSchema);