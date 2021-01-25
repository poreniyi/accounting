var mysql = require("mysql");
var syncMysql = require("sync-mysql");
const passport = require("passport");
const { Passport } = require("passport");

var asyncConnection = mysql.createConnection({
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

asyncConnection.connect();

asyncConnection.on('error', function (error){
    console.log(error.toString());
})

module.exports= {
    asyncConnection,
    syncConnection
}