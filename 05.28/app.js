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

app.get('/practice', function(req, res) {
  res.sendfile("practice.html")
});

app.get('/insertInfo', function(req, res) {
  res.sendfile("insertInfo.html")
});

app.get('/productList', function(req, res) {
  res.sendfile("productList.html")
});

var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({
  extended: false
}))
app.use(bodayParser.json());

app.post('/buyProduct', function(req, res) {
  let pricePrice = req.body.inputPrice;
  let buyProductName = "구매 불가능"

  connection.query(`SELECT *
FROM item
order by itemPrice asc`,
    function(error, results, fields) {
      for (let i = 0; i < results.length; i++) {
        if (pricePrice >= results[i].itemPrice) {
          buyProductName = results[i].itemName
        }
      }
      res.send(buyProductName);
    });
});

app.post('/insertDB', function(req, res) {
  let userInputItem = req.body.inputItem
  let userInputprice = req.body.inputPrice
  let sendResults = "";

  connection.query(`SELECT * FROM item
        WHERE itemName = '${userInputItem}'
        or itemPrice=${userInputprice}`,
    function(error, results, fields) {
      if (results.length >= 2) {
        sendResults = `이름,가격이 동일한데 아이템도 존재 (${results.length}개)`;
        res.send(sendResults)
      } else if (results.length == 1) {
        if ((results[0].itemName == userInputItem) && (results[0].itemPrice == userInputprice)) {
          sendResults = "이름, 가격 동일한 아이템 존재"
        } else if (results[0].itemName == userInputItem) {
          sendResults = "이름 동일함"
        } else if (results[0].itemPrice == userInputprice) {
          sendResults = "가격 동일함"
        }
        res.send(sendResults)
      } else if (results.length == 0) {
        connection.query(`INSERT INTO item
                (itemName, itemPrice)
                VALUES
                ('${userInputItem}','${userInputprice}')`,
          function(error, results, fields) {
            if (error) {
              sendResults = "not ok"
              res.send(sendResults)
            } else {
              sendResults = "ok"
              res.send(sendResults)
            }
          });
      }
    });
});

app.get('/dbList', function(req, res) {
  connection.query(`SELECT * FROM item`,
    function(error, results, fields) {
      if(error) console.log(error)
      res.send(results);
    });
});

app.delete('/deleteData', function(req, res) {
  console.log(req.body.indexNumber)
  connection.query(`DELETE FROM item
WHERE no = "${req.body.indexNumber}";`,
    function(error, results, fields) {
      if(error) console.log(error)
      res.send(results);
    });
});
