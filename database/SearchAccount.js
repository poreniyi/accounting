
const DB = require("./DBConnection");
const account = require("./CreateAccount");

async function getAccountNames(){

    let query = `SELECT NAME FROM MASTER`;

    let [result] = await DB.asyncConnection.query(query)

    var data = [];
    
    for(var i = 0; i < result.length; i++){
        data.push(result[i].NAME)
    }

   return data

}

async function searchByName(accountName){

    let check = await account.accountExists(accountName)

    if(check == false){
        return false;
    }

     let query = `SELECT * FROM ${accountName}`

     let [result] = await DB.asyncConnection.query(query)

    return result[0]
}

async function searchByNumber(accountNumber){

     let query = `CALL Search_By_Number(${accountNumber})`

     let [result] = await DB.asyncConnection.query(query)

    return result[0]

}

async function getAllAccounts(){

    let query = `SELECT NAME, NUMBER, DESCRIPTION, NORMALSIDE, CATEGORY, SUBCATEGORY, INITIALBALANCE, DEBIT, CREDIT,
                 BALANCE, DATE_FORMAT(DOC, '%m/%d/%Y') AS DOC, USERNAME, STATEMENT, COMMENT, IF(STATUS = 1,'Active', 'Deactivated') AS STATUS FROM MASTER
                 ORDER BY NUMBER`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

   return data

}

async function getEventLog(table){

    let query = `SELECT NAME, NUMBER, DESCRIPTION, NORMALSIDE, CATEGORY, SUBCATEGORY, INITIALBALANCE, DEBIT, CREDIT,
    BALANCE, DOC, USERNAME, STATEMENT, COMMENT, IF(STATUS = 1,'Active', 'Deactivated') AS STATUS, EVENTID FROM ${table}
    ORDER BY EVENTID+0 DESC`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

    return data;
}

async function deleteAccount(table){

    let ledger = table + "_ledger"

    let query = `DROP TABLE ${table}; DROP TABLE ${ledger}; DELETE FROM MASTER WHERE NAME = '${table}';`

    DB.asyncConnection.query(query)

}

module.exports= {
    searchByName:searchByName,
    searchByNumber:searchByNumber,
    getAllAccounts:getAllAccounts,
    getEventLog:getEventLog,
    getAccountNames:getAccountNames,
    deleteAccount:deleteAccount
}