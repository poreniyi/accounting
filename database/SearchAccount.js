
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

searchByNumber(10200)


module.exports= {
    searchByName:searchByName,
    searchByNumber:searchByNumber
}