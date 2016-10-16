
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


var https = require('https');
var http = require('http');
const fs = require('fs');
const app = express();

var PythonShell = require('python-shell');

var options = {
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/fullchain.pem')
};

const app = express();

MongoClient.connect('mongodb://secureUsername:securePassword@ds035623.mlab.com:35623/stickytunes', function(err, database){
  if (err) return console.log(err);
  db = database;
  http.createServer(app).listen(80, function(){
    console.log('listening for http on 80'); 
  }); 
  https.createServer(options, app).listen(443, function(){
    console.log('listening for https on 443'); 
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
      var id = docsInserted.ops[0]._id
    });

    var options = {
      mode: 'text',
      scriptPath: './',
      args: [id, lyrics, '3', '80']
    };


    PythonShell.run('synthesize.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
      res.redirect('/');
    });
});

