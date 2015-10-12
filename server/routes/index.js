var express = require('express');
var router = express.Router();
var path = require('path');

var passport = require('passport');

var User = require('../models/user');
var Speech = require('../models/speech');

router.get("/admin", function(req, res, next){
    var file = req.params[0] || 'views/admin.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

router.get("/getsessions", function(req,res,next){
    Speech.find({}).exec(function(err,data){
        res.send(data);
    })
});

router.put('/getsessions/:id', function(req, res, next){
    console.log("got to put!");
    Speech.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        console.log("got inside speech.findbyidandupdate");
        return Speech.find({}).exec(function(err, data){
            if(err) throw new Error(err);
            res.send(JSON.stringify(data));
        });
    });
});

router.get("/getusers", function(req,res,next){
    User.find({}).exec(function(err,data){
        res.send(data);
    })
});
router.post("/", passport.authenticate('local', {
    successRedirect: "/assets/views/routes/home.html",
    //successRedirect: "/assets/views/users.html",
    failureRedirect: "/"
}));

router.get('/create', function(req, res, next){
    res.sendFile(path.join(__dirname, "../public/assets/views/another.html"));
});

router.get("/admin", function(req, res, next){
    console.log("Hit: ", req.params);
    var file = req.params[0] || '/assets/views/admin.html';
    res.sendFile(path.join(__dirname, "../public", file));
});


router.get("/*", function(req, res, next){
    console.log("Hit: ", req.params);
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;