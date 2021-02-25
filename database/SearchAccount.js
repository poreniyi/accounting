
const DB = require("./DBConnection");
const account = require("./CreateAccount");

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
                 BALANCE, DOC, USERNAME, STATEMENT, COMMENT, IF(STATUS = 1,'Active', 'Deactivated') AS STATUS FROM MASTER
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
    ORDER BY EVENTID DESC`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

    return data;
}


module.exports= {
    searchByName:searchByName,
    searchByNumber:searchByNumber,
    getAllAccounts:getAllAccounts,
    getEventLog:getEventLog
}