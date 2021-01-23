var mysql = require("mysql");
const passport = require("passport");
const { Passport } = require("passport");

var connection = mysql.createConnection({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b8d03e7734ddc4',
    password : 'ebec160b',
    database : 'heroku_f886e82f73ac5d5'
});


var query = ("SELECT * FROM ADMINISTRATOR");

connection.connect();

connection.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});