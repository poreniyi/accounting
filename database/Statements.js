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

async function generateBalanceSheet(){

    let query = `SELECT NAME, CATEGORY, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE BALANCE != 0 AND 
                (CATEGORY = 'ASSET' OR CATEGORY = 'Liability' OR CATEGORY = 'Equity') ORDER BY CATEGORY DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var asset = { TextRow: [] }
    var liability = { TextRow: [] }
    var equity = { TextRow: [] }

    let current

    for(var i = 0; i < [rows][0].length; i++){
        
        current = [rows][0][i]

        if(current.BALANCE < 0){
            current.BALANCE = "(" + current.BALANCE * -1 + ")"
        }

        if(current.CATEGORY == 'Asset'){
            asset.TextRow.push(current)
        }
        else if(current.CATEGORY == 'Liability'){
            liability.TextRow.push(current)
        }else{
            equity.TextRow.push(current)
        }
    }

    let data = {
        asset: asset,
        liability: liability,
        equity:equity
    }

    return data;
}

generateBalanceSheet()

module.exports= {
    generateTrialBalance,
    generateBalanceSheet,
}