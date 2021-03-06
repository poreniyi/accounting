const DB = require("./DBConnection");

async function getTransactionID(){

    let query = `CALL GET_TRANSACTION_ID()`

    let [rows] = await DB.asyncConnection.query(query)

    return rows[0][0].ID
}

async function createTransaction(username, account,  description, debit, credit, ID, date){

    let query = `CALL CREATE_TRANSACTION(?,?,?,?,?,?,?)`

    await DB.asyncConnection.query(query, [username, account, description, debit, credit, ID, date], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

}

async function getJournalTransactions(status){

    let query;

    if(status){
        query = `
            SELECT DATE_FORMAT(DATE, '%m/%d/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, 
            (DEBIT+CREDIT) AS AMOUNT, COMMENT, STATUS, ID FROM JOURNAL WHERE STATUS = '${status}'
            ORDER BY ID, DEBIT DESC, CREDIT DESC;
            `
    }
    else{
        query = `
        SELECT DATE_FORMAT(DATE, '%m/%d/%Y') AS DATE, USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, 
        (DEBIT+CREDIT) AS AMOUNT, COMMENT, STATUS, ID FROM JOURNAL ORDER BY STATUS = 'Pending' DESC,
        STATUS = 'Approved' DESC, STATUS =  'Rejected', ID, DEBIT DESC, CREDIT DESC
        `
    }
                
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

    let query = `SELECT DATE_FORMAT(JOURNAL.DATE, '%m/%d/%Y') AS DATE, JOURNAL.USERNAME, JOURNAL.ACCOUNT, JOURNAL.DESCRIPTION, JOURNAL.DEBIT, JOURNAL.CREDIT, 
	JOURNAL.COMMENT, JOURNAL.STATUS, JOURNAL.ID, MASTER.NORMALSIDE FROM JOURNAL 
    JOIN MASTER ON JOURNAL.ACCOUNT = MASTER.NAME WHERE ID = '${id}' ORDER BY DEBIT DESC, CREDIT ASC;`

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
                  ORDER BY ID ASC, DEBIT DESC, CREDIT DESC;`

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