var mysql = require("mysql");
var syncMysql = require("sync-mysql");
const passport = require("passport");
const { Passport } = require("passport");

var asyncConnection = mysql.createPool({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b8d03e7734ddc4',
    password : 'ebec160b',
    database : 'heroku_f886e82f73ac5d5'
});

var syncConnection = new syncMysql({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b8d03e7734ddc4',
    password : 'ebec160b',
   database : 'heroku_f886e82f73ac5d5'
});



module.exports= {
    asyncConnection,
    syncConnection
}