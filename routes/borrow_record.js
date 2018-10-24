let mongoose = require('mongoose');
var Record = require('../models/borrow_record');
var Book = require('../models/books');
let express = require('express');
let router = express.Router();


var mongodbUri = 'mongodb://admin:123456a@ds139883.mlab.com:39883/librarydb';

mongoose.connect(mongodbUri);
let db = mongoose.connection;
db.on('error',function(err){
    console.log('Unable to Connect to [ ' + db.name + ']',err);
});
db.once('open',function(){
    console.log('Successfully Connected to [ '+db.name+']');
});

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Record.find(function(err,record){
        if(err)
            res.send(err);
        res.send(JSON.stringify(record,null,5));
    });
}

router.findOne=(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    Record.find({"_id":req.params.id},function(err, record) {
        if(err)
            res.json({message:'Record NOT Found!',errmsg:err});
        else
            res.send(JSON.stringify(record,null,5));
    });
}

router.borrowBook = (req, res) => {
    res.setHeader('Content-Type','application/json');
    Book.findById(req.body.book_id, function(err,book){
        if(err)
            res.json({message: 'Book NOT Found!', errmsg : err});
        else{
            if(book.status === true){
                book.status = false;
                book.save(function (err) {
                    if(err)
                        res.json({message: 'Book NOT Borrowed!', errmsg : err});
                    else {
                        var record = new Record();
                        record.book_id = req.body.book_id;
                        record.user_id = req.body.user_id;
                        record.save(function (err) {
                            if(err)
                                res.json({message:'Record NOT Added!'});
                            else
                                res.json({message:'Record Successfully Added!', data: record});
                        });
                    }
                });}
            else
                res.json({message: 'Book has been borrowed before, can not do it again!'});
        }
    });
}




router.returnBook = (req,res)=>{
    Record.findById(req.params.id, function(err,record) {
        if (err)
            res.json({message: 'Record NOT Found!', errmsg: err});
        else {
            if(record.return_date != null)
                res.json({message:'Book has been returned before, can not do it again'});
            else{
                record.return_date = Date.now();
                record.save(function (err) {
                    if (err)
                        res.json({message: 'Record NOT modified!', errmsg: err});
                    else {
                        Book.findById(record.book_id, function (err, book) {
                            if (err)
                                res.json({message: 'Book NOT Found!', errmsg: err});
                            else {
                                if (book.status === false) {
                                    book.status = true;
                                    book.save(function (err) {
                                        if (err)
                                            res.json({message: 'Book NOT Return!', errmsg: err});
                                        else
                                            res.json({message: 'Book Successfully returned!', data: record});
                                    });
                                }
                                else
                                    res.json({message: 'Book has been returned, can not do it again!'});
                            }
                        });
                    }
                });
            }

        }
    });
}

router.deleteRecord = (req, res) => {
    Record.findByIdAndRemove(req.params.id, function (err) {
        if(err)
            res.json({message:'Record NOT Deleted!'});
        else
            res.json({message:'Record Successfully Deleted!'});
    });
}

router.countRecord = (req,res) => {
    Record.count(function (err,count) {
        if(err)
            res.send(err);
        else
            res.json({totalRecord:count});
    });
}

module.exports = router;
