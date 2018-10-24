let mongoose = require('mongoose');
let borrow_recordSchema = new mongoose.Schema({
        book_id: String,
        user_id: String,
        borrow_date: Date,
        return_date: String  //status 1 means book is in library, and 0 means book isn't in library.
    },
    {collection:'borrow_records'});
module.exports = mongoose.model('Record',borrow_recordSchema);