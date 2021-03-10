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

async function addTransactionToLedger(id, comment, status){

    let query = `UPDATE JOURNAL SET COMMENT = '${comment}', STATUS = '${status}' WHERE ID = '${id}'`

    DB.asyncConnection.query(query)

    if(status == 'Rejected'){
        return;
    }

    query = `SELECT USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT FROM JOURNAL WHERE ID = '${id}'`

    let [rows] = await DB.asyncConnection.query(query)

    var accounts = []

    for(var i = 0; i < [rows][0].length; i++){
        accounts.push([rows][0][i])
    }

    for(var i = 0; i < accounts.length; i++){

        query = `CALL ADD_TRANSACTION_TO_LEDGER(?,?,?,?,?,?)`

        DB.asyncConnection.query(query, [accounts[i].USERNAME, accounts[i].ACCOUNT, accounts[i].DESCRIPTION, accounts[i].DEBIT, accounts[i].CREDIT, id], 
            function (err, result, fields) {
                if(err){
                    console.log("Query failed")
                    throw err;
                } 
        });

        query = `SELECT NAME, NUMBER, DESCRIPTION, NORMALSIDE, CATEGORY, SUBCATEGORY, INITIALBALANCE, DEBIT, CREDIT,
        BALANCE, DOC, USERNAME, STATEMENT, COMMENT, STATUS FROM MASTER WHERE NAME = '${accounts[i].ACCOUNT}'`

        let [result] = await DB.asyncConnection.query(query)

        var data= {
            OriginalName: [result][0][0].NAME,
            OriginalNumber: [result][0][0].NUMBER,
            Name: [result][0][0].NAME,
            Number: [result][0][0].NUMBER,
            Description: [result][0][0].DESCRIPTION,
            Normal: [result][0][0].NORMALSIDE,
            Category: [result][0][0].CATEGORY,
            SubCategory: [result][0][0].SUBCATEGORY,
            InitialBalance: [result][0][0].INITIALBALANCE,
            Debit: accounts[i].DEBIT,
            Credit: accounts[i].CREDIT,
            Balance: [result][0][0].BALANCE,
            DOC: [result][0][0].DOC,
            Statement: [result][0][0].STATEMENT,
            Username: [result][0][0].USERNAME,
            Comment:[result][0][0].COMMENT,
            Status: [result][0][0].STATUS
        }
        editAccount.editAccount(data, accounts[i].USERNAME)
    }
}

module.exports = {
    findLedger:findLedger,
    addTransactionToLedger:addTransactionToLedger
}