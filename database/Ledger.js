const DB = require("./DBConnection");
const editAccount = require("./EditAccount")

async function findLedger(name){

    let ledger = name + "_ledger"

    let query = `SELECT DATE_FORMAT(DATE, '%d/%m/%Y') AS DATE, USERNAME, DESCRIPTION, DEBIT, CREDIT, BALANCE, ID FROM ${ledger}`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }
    return data
}

async function addTransactionToLedger(body, username){

    
    let query = `CALL ADD_TRANSACTION_TO_LEDGER(?,?,?,?,?,?)`

    DB.asyncConnection.query(query, [username, body.Account, body.Description, body.Debit, body.Credit, body.ID], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    query = `UPDATE JOURNAL SET COMMENT = '${body.Comment}', STATUS = '${body.Status}' WHERE ID = '${body.ID}'`

    query = `SELECT NAME, NUMBER, DESCRIPTION, NORMALSIDE, CATEGORY, SUBCATEGORY, INITIALBALANCE, DEBIT, CREDIT,
    BALANCE, DOC, USERNAME, STATEMENT, COMMENT, STATUS FROM MASTER WHERE NAME = '${body.Account}'`

    let [rows] = await DB.asyncConnection.query(query)

    var data= {
        OriginalName: [rows][0][0].NAME,
        OriginalNumber: [rows][0][0].NUMBER,
        Name: [rows][0][0].NAME,
        Number: [rows][0][0].NUMBER,
        Description: [rows][0][0].DESCRIPTION,
        Normal: [rows][0][0].NORMALSIDE,
        Category: [rows][0][0].CATEGORY,
        SubCategory: [rows][0][0].SUBCATEGORY,
        InitialBalance: [rows][0][0].INITIALBALANCE,
        Debit: body.Debit,
        Credit: body.Credit,
        Balance: [rows][0][0].BALANCE,
        DOC: [rows][0][0].DOC,
        Statement: [rows][0][0].STATEMENT,
        Username: [rows][0][0].USERNAME,
        Comment: [rows][0][0].COMMENT,
        Status: [rows][0][0].STATUS
    }

    editAccount.editAccount(data, username)
}

module.exports = {
    findLedger:findLedger,
    addTransactionToLedger:addTransactionToLedger
}