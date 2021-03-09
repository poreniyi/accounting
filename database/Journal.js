const DB = require("./DBConnection");

async function getTransactionID(){

    let query = `CALL GET_TRANSACTION_ID()`

    let [rows] = await DB.asyncConnection.query(query)

    return rows[0][0].ID
}

async function createTransaction(username, account,  description, debit, credit, ID){

    let query = `CALL CREATE_TRANSACTION(?,?,?,?,?,?)`

    DB.asyncConnection.query(query, [username, account, description, debit, credit, ID], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
}

async function getJournalTransactions(){

    let query = `SELECT * FROM JOURNAL`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

    return data;
}


module.exports = {
    createTransaction:createTransaction,
    getTransactionID:getTransactionID,
    getJournalTransactions:getJournalTransactions
}