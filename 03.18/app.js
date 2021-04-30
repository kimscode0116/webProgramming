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

// 데이터 insert 하기
app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("good.html")
}); // 주문을 읽어오는 로직

var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({ extended: false}))
app.use(bodayParser.json());


app.post('/studentInfoPractice', function(req, res) {
  connection.query(`INSERT INTO student
(studentNo, NAME, age)
VALUES
('${req.body.studentNo}','${req.body.name}','${req.body.age}')`,
    function(error, results, fields){
      res.send(results);
    });
});

// 번호 입력해서 데이터 불러오기
app.get('/test1', function(req, res) {
  res.sendfile("ajaxPractice.html")
});


app.get('/getPractice', function(req, res) {
  connection.query(`SELECT NO, studentNo, NAME, age
   FROM student where NO=${req.query.no}`,
    function(error, results, fields){
      res.send(results);
    });
});
