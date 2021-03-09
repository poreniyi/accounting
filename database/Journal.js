const DB = require("./DBConnection");

async function createTransaction(username, account, number, description, debit, credit){

    let query = `CALL CREATE_TRANSACTION(?,?,?,?,?)`

    DB.asyncConnection.query(query, [username, account, number, description, debit, credit], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

}

module.exports = {
    createTransaction:createTransaction
}