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

app.get('/test0325', function(req, res) {
  res.sendfile("userInput.html")
});

// 여기는 문법임 ==================================
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.post('/userTest', function(req, res) {
  connection.query(`INSERT INTO news
(title, content)
VALUES
('${req.body.title}','${req.body.content}')`,
    function(error, results, fields){
      if(error) {
        res.send("not ok");
        console.log("입력실패");
      }
      else if(results.affectedRows==1) {
        res.send("ok");
        console.log("입력성공");
      }
    });
});
