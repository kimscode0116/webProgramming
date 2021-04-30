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

app.get('/gugu_option', function(req, res) {
  res.sendfile("gugu_option.html")
});

app.get('/radio', function(req, res) {
  res.sendfile("practice.html")
});
