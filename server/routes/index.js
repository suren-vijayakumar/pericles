var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var Task = mongoose.model('task', {text: String, complete: Boolean});

router.get('/todos', function(req, res, next){
    return Task.find({}).exec(function(err, stuff){
        if(err) throw new Error(err);
        res.send(JSON.stringify(stuff));
    });
});

router.post('/todos', function(req, res, next){
    var stuff = new Task({text: req.body.text, complete: false});
    stuff.save(function(err){
        if(err) console.log('error ', err);
        res.send(stuff.toJSON());
    });
});

router.put('/todos/:id', function(req, res, next){
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, stuff){
        return Task.find({}).exec(function(err, stuff){
            if(err) throw new Error(err);
            res.send(JSON.stringify(stuff));
        });
    });
});

router.delete("/todos/:id", function(req, res, next){
    Task.findByIdAndRemove(req.params.id, req.body, function(err, stuff){
        return Task.find({}).exec(function(err, stuff){
            if(err) throw new Error(err);
            res.send(JSON.stringify(stuff));
        });
    });
});

router.get("/*", function(req, res, next){
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;