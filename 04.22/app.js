let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

app.get('/test0422', function(req, res) {
  res.sendfile("arr.html")
});

app.get('/radioTest', function(req, res) {
  res.sendfile("radio.html")
});


app.get('/radio2', function(req, res) {
  res.sendfile("radiooooooo.html")
});
