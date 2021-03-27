const DB = require("./DBConnection");

async function generateTrialBalance(){

    let query = `SELECT NAME, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE BALANCE != 0 ORDER BY CATEGORY DESC`

    let [rows] = await DB.asyncConnection.query(query)

    var data = { TextRow: [] }

    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]
        if(current.BALANCE < 0){
            if(current.COLUMN == 'Debit'){
                current.COLUMN = 'Credit'
                current.BALANCE = current.BALANCE * -1
            }
            else{
                current.COLUMN = 'Debit'
                current.BALANCE = current.BALANCE * -1
            }
        }
        data.TextRow.push(current)
    }

    return data;
}

module.exports= {
    generateTrialBalance,
}