const mongoose = require('mongoose');
// schema maps to a collection
const Schema = mongoose.Schema;

const stateAndDistrictSchema= new Schema({
    states:String,
    districts:[String]
});

module.exports = mongoose.model('stateanddistricts', stateAndDistrictSchema);