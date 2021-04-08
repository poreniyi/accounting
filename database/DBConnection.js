var mysql_npm = require("mysql2/promise");

var db_config = {
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b8d03e7734ddc4',
    password : 'ebec160b',
    database : 'heroku_f886e82f73ac5d5',
    multipleStatements: true,
    timezone : '-04:00'
};

var asyncConnection = mysql_npm.createPool(db_config);

asyncConnection.on('error', function(err) { 
        console.log("ERROR: ("+err.code+")");
});

module.exports= {
    asyncConnection
}