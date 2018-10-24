let mongoose = require('mongoose');
let StuSchema = new mongoose.Schema({
        stu_name: String,
        age: {type:Number,min:0},
        major: String,
        stu_number: {type:String,trim:true}
    },
    {collection:'students'});
module.exports = mongoose.model('Student',StuSchema);