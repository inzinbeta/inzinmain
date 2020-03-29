const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const businessProfileSchema= new Schema({

    title: String,
    heading: String,
    specifications: [],

    description:String,
    slider1:String,
    slider2:String,
    slider3:String,
    slider4:String,
    related1:String,
    related2:String,
    related3:String,


});


module.exports = mongoose.model('businessprofile', businessProfileSchema);