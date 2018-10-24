let mongoose = require('mongoose');
var Student = require('../models/students');
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
    Student.find(function(err,stu){
        if(err)
            res.send(err);
        res.send(JSON.stringify(stu,null,5));
    });
}

router.findOne=(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    Student.find({"_id":req.params.id},function(err, stu) {
        if(err)
            res.json({message:'Student NOT Found!',errmsg:err});
        else
            res.send(JSON.stringify(stu,null,5));
    });
}

router.addStudent = (req, res) => {
    res.setHeader('Content-Type','application/json');
    var stu = new Student();
    stu.stu_name = req.body.stu_name;
    stu.age = req.body.age;
    stu.major = req.body.major;
    stu.stu_number = req.body.stu_number;
    stu.save(function (err) {
        if(err)
            res.json({message:'Student NOT Added!'});
        else
            res.json({message:'Student Successfully Added!', data: stu});
    });
}


router.deleteStudent = (req, res) => {
    Student.findByIdAndRemove(req.params.id, function (err) {
        if(err)
            res.json({message:'Student NOT Deleted!'});
        else
            res.json({message:'Student Deleted!'});
    });
}

module.exports = router;
