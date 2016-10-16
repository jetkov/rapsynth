  
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


var https = require('https');
var http = require('http');
const fs = require('fs');
const app = express();

var PythonShell = require('python-shell');
MongoClient.connect('mongodb://secureUsername:securePassword@ds035623.mlab.com:35623/stickytunes', function(err, database){
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function(){
    console.log('listening on 3000'); 
  }); 
});

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {

    fs.readdir('./synthesis/output', function(err, data){
      res.render('index', {"files": data});
    });
});


app.post('/submit', function(req, res) {
    lyrics = req.body.lyrics;
    name = req.body.name; 
    var temp;
    db.collection('songs').insert({"lyrics": lyrics, "name": name}, function(err,docsInserted){
      temp = docsInserted.ops[0]._id;
    });
    id = temp;

    var options = {
      mode: 'text',
      scriptPath: './',
      args: [id, lyrics, '2', '80']
    };


    PythonShell.run('synthesize.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
      res.redirect('/');
    });
});
