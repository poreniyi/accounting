const DB = require("./DBConnection");

async function pendingUsers(){

    var query = "SELECT * FROM USER JOIN PENDING_USER ON USER.USERNAME = PENDING_USER.USERNAME"
    
    DB.asyncConnection.query(query)
}

