var express = require('express')
var app = express()
var cors = require('cors')
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/factwings');

app.use(function(req, res, next) {
    req.db = db;
    next();
});


app.get('/factbook/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('factbook');
    collection.find({ "Communications.Internet country code.text": "."+req.params.id }, {}, function(e, docs) {
        res.send(docs);
    });
})

app.get('/restaurants/v1/burgers/:city', cors(), function(req, res) {
    var db = req.db;
    var collection = db.get('restaurants');
    collection.find({ "type": "burger", "branches.city": req.params.city }, {}, function(e, docs) {
        res.send(docs);
    });
})


app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})