let mongoose = require('mongoose');
let borrow_recordSchema = new mongoose.Schema({
        book_id: String,
        user_id: String,
        borrow_date: {type:Date, default:Date.now()},
        return_date: {type:Date, default:null}
    },
    {collection:'borrow_records'});
module.exports = mongoose.model('Record',borrow_recordSchema);