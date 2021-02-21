
const DB = require("./DBConnection");
const account = require("./CreateAccount");

async function searchByName(accountName){

    let check = await account.accountExists(accountName)

    if(check == false){
        return false;
    }

     let query = `SELECT * FROM ${accountName}`

     let [result] = await DB.asyncConnection.query(query)

    return result
}

async function searchByNumber(accountNumber){

     let query = `CALL Search_By_Number(${accountNumber})`

     let [result] = await DB.asyncConnection.query(query)

    return result

}

async function getAllAccounts(){

    let query = 'SELECT * FROM MASTER'

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

   return data

}


module.exports= {
    searchByName:searchByName,
    searchByNumber:searchByNumber,
    getAllAccounts:getAllAccounts
}