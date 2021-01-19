var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b8d03e7734ddc4',
    password : 'ebec160b',
    database : 'heroku_f886e82f73ac5d5'
  });

  connection.connect();

  connection.query("SELECT * FROM administrator", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });