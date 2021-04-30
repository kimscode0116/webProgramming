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

app.get('/work1', function(req, res) {
  res.sendfile("work1.html")
});

app.get('/work2', function(req, res) {
  res.sendfile("work2.html")
});

app.get('/work3', function(req, res) {
  res.sendfile("work3.html")
});

app.get('/work4', function(req, res) {
  res.sendfile("work4.html")
});

var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({ extended: false}))
app.use(bodayParser.json());

app.post('/insertStudent', function(req, res) {
  connection.query(`INSERT INTO student
(studentNo, studentName)
VALUES
('${req.body.studentNo}','${req.body.name}')`,
    function(error, results, fields){
      res.send(results);
    });
});
