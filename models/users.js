let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
        user_name: String,
        age: {type:Number,min:0},
        major: String,
        stu_number: {type:String,trim:true}  //status 1 means book is in library, and 0 means book isn't in library.
    },
    {collection:'users'});
module.exports = mongoose.model('User',UserSchema);