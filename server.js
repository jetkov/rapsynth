
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

var http = require('http');

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

    fs.readdir(/synthesize/, function(err, data){
      res.render('index', {"files": data});
    });
    res.render('index');
});


app.post('/submit', function(req, res) {
    lyrics = req.body.lyrics;
    db.collection('songs').insert({
        "lyrics": lyrics
    });
    res.redirect('/');
});
