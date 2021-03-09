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

    let query = `SELECT DATE_FORMAT(DATE, '%d/%m/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, COMMENT, STATUS, ID FROM JOURNAL ORDER BY ID ASC`

    var [rows] = await DB.asyncConnection.query(query)

    var data = { TextRow: [] }
    
    var previous;
    var current;

    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

    return data;
}

async function getTransactionsByID(id){

    let query = `SELECT DATE_FORMAT(DATE, '%d/%m/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, COMMENT, STATUS, ID FROM JOURNAL WHERE ID = ${id};`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

   return data
}

getTransactionsByID(100000)

module.exports = {
    createTransaction:createTransaction,
    getTransactionID:getTransactionID,
    getJournalTransactions:getJournalTransactions,
    getTransactionsByID:getTransactionsByID
}