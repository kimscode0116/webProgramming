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
// 검색 후 복사해서 쓰면 됨 노드를 이용해 쿼리를 날리지 위해 적어놓


app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("ajaxPractice0.html")
}); // 주문을 읽어오는 로직


app.get('/studentInfoPractice', function(req, res) {
  connection.query(`SELECT NO, studentNo, NAME, age
   FROM student where NO=${req.query.no}`),
    function(error, results, fields){
      res.send(results);
    });
});
