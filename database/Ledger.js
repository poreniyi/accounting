const DB = require("./DBConnection");

async function findLedger(name){

    let ledger = name + "_ledger"

    let query = `SELECT DATE_FORMAT(DATE, '%d/%m/%Y') AS DATE, USERNAME, DESCRIPTION, DEBIT, CREDIT, BALANCE, ID FROM ${ledger}`

    let [rows] = await DB.asyncConnection.query(query)

    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }

    console.log(data)

    return data

}

module.exports = {
    findLedger:findLedger
}