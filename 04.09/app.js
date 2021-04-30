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

app.get('/test0409', function(req, res) {
  res.sendfile("userInput.html")
});

// 여기는 문법임 ==================================
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.get('/getNews', function(req, res) {
  connection.query(`SELECT * from news`,
    function(error, results, fields){
      if(error) console.log(error);
      res.send(results);
    });
});

app.post('/postnews', function(req, res) {
  console.log(req.body.title, req.body.content);
  let title = req.body.title;
  let content = req.body.content;

  connection.query(`INSERT INTO news (title, content) VALUES
('${title}','${content}')`,
    function(error, results, fields){
      if(error) console.log(error);
        res.send(results);
    });
});
