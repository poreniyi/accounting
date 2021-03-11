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

async function getJournalTransactions(status){

    let query = `
                SELECT DATE_FORMAT(DATE, '%m/%d/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, 
                (DEBIT+CREDIT) AS AMOUNT, COMMENT, STATUS, ID FROM JOURNAL ORDER BY STATUS = 'Pending' DESC,
                STATUS = 'Approved' DESC, STATUS =  'Rejected'
                `

    var [rows] = await DB.asyncConnection.query(query)

    var data = { TextRow: [] }
    
    var previous;
    var current;

    for(var i = 0; i < [rows][0].length; i++){  
        current = [rows][0][i]
        if(i > 0){
            if([rows][0][i-1].ID != ''){
                previous = [rows][0][i-1];
            }
           if(current.ID == previous.ID){
                 current.ID = ''
                 current.DATE = ''
                 current.DESCRIPTION = ''
                 current.USERNAME = ''
                 current.STATUS = ''
             }
        }
        data.TextRow.push(current)
    }

    return data;
}

async function getTransactionsByID(id){

    let query = `SELECT DATE_FORMAT(DATE, '%m/%d/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, COMMENT, STATUS, ID FROM JOURNAL WHERE ID = '${id}' ORDER BY DEBIT DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

   return data
}


async function getTransactionsFromLastLogin(date){

    let query = `SELECT DATE_FORMAT(DATE, '%m/%d/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, COMMENT, STATUS, ID FROM JOURNAL 
                WHERE DATE >= DATE_FORMAT(STR_TO_DATE('${date}', '%m/%d/%Y'), '%Y-%m-%d') AND STATUS = 'Pending'
                  ORDER BY ID ASC;`

    let [rows] = await DB.asyncConnection.query(query)
    var data = { TextRow: [] }
    
    var previous;
    var current;

    for(var i = 0; i < [rows][0].length; i++){  
        current = [rows][0][i]
        if(i > 0){
            if([rows][0][i-1].ID != ''){
                previous = [rows][0][i-1];
            }
           if(current.ID == previous.ID){
                 current.ID = ''
                 current.DATE = ''
                 current.DESCRIPTION = ''
                 current.USERNAME = ''
                 current.STATUS = ''
             }
        }
        data.TextRow.push(current)
    }

    return data;
}

module.exports = {
    createTransaction:createTransaction,
    getTransactionID:getTransactionID,
    getJournalTransactions:getJournalTransactions,
    getTransactionsByID:getTransactionsByID,
    getTransactionsFromLastLogin:getTransactionsFromLastLogin
}