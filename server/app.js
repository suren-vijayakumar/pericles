var express = require('express');
var index = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');

var index = require("./routes/index.js");

var mongoDB = mongoose.connect('mongodb://localhost/spiik').connection;

mongoDB.on('error', function(err){
    if(err){
        console.log("MONGO ERROR: ", err);
    }
});

mongoDB.once('open', function(){
    console.log("YOU ARE CONNECTED TO MONGO!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


app.use('/', index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;