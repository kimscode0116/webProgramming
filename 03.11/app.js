let express = require('express');
let http = require('http');
let app = express();

//80번 포트에서 서버 리퀘스트
let server = http.createServer(app).listen(80);

let mysql = require('mysql')

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'test',
});

connection.connect();


//메인 주소로 리퀘스트를 받아서 서버로 보내주겠
app.get('/', function (req, res) {
	res.send([10, 20, 30]);
});

app.get('/practice00', function (req, res) {
	res.sendfile("practice00.html");
});

app.get('/practice0', function (req, res) {
	res.sendfile("practice0.html");
});

app.get('/table', function (req, res) {
	res.sendfile("table.html");
});

app.get('/table0', function (req, res) {
	res.sendfile("table0.html");
});

app.get('/css', function (req, res) {
	res.sendfile("css.html");
});

app.get('/testdb', function (req, res) {

	connection.query('SELECT NO, studentNo, NAME FROM student WHERE NO <= 12 AND NO >=10' ,
	function (error, results, fields) { if (error) throw error;
  console.log(results);
		res.send(results);
});

});
