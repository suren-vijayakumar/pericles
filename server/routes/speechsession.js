/**
 * Created by surenros on 9/4/15.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Speech = require('../models/speech');

router.get("/", function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/assets/views/admin.html'));
});

router.post("/", function (req, res, next){
    console.log("Made it to post! ", req.body);
    Speech.create(req.body, function(err, post){
        if(err) next(err);
        //else res.redirect("/index");
        else res.sendFile(path.resolve(__dirname, '../public/assets/views/routes/home.html'))
    });
});

module.exports = router;