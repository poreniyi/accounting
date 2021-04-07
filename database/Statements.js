const DB = require("./DBConnection");

async function generateTrialBalance(){

    let query = `SELECT NAME, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER ORDER BY CATEGORY DESC`

    let [rows] = await DB.asyncConnection.query(query)

    var data = { TextRow: [] }
    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = current = [rows][0][i]

        if(current.BALANCE < 0){
            current.BALANCE = "(" + current.BALANCE * -1 + ")"
         }
        data.TextRow.push(current)
    }

    return data;
}

async function generateBalanceSheet(end){


    let query = `SELECT NAME, CATEGORY, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE
    (CATEGORY = 'ASSET' OR CATEGORY = 'Liability' OR CATEGORY = 'Equity') ORDER BY CATEGORY DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var asset = { TextRow: [] }
    var liability = { TextRow: [] }
    var equity = { TextRow: [] }

    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]

        query = `SELECT BALANCE FROM ${current.NAME}_LEDGER WHERE DATESUBMITTED < '${end} 00:00:00' ORDER BY DATESUBMITTED DESC LIMIT 1;`

        let [rows2] = await DB.asyncConnection.query(query)

        if(rows2.length > 0){
            if([rows2][0][0].BALANCE < 0){
                current.BALANCE = "(" + [rows2][0][0].BALANCE * -1 + ")"
            }else{
                current.BALANCE = [rows2][0][0].BALANCE
            }
        }
        else{
            current.BALANCE = 0
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
        equity: equity
    }

    return data;
}

async function generateIncomeStatement(){

    let query = `SELECT NAME, CATEGORY, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE BALANCE != 0 AND 
                (CATEGORY = 'Revenue' OR CATEGORY = 'Expense') ORDER BY CATEGORY DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var revenue = { TextRow: [] }
    var expense = { TextRow: [] }

    let current

    for(var i = 0; i < [rows][0].length; i++){
        
        current = [rows][0][i]

        if(current.BALANCE < 0){
            current.BALANCE = "(" + current.BALANCE * -1 + ")"
        }

        if(current.CATEGORY == 'Revenue'){
            revenue.TextRow.push(current)
        }
        else{
            expense.TextRow.push(current)
        }
    }

    let data = {
        revenue: revenue,
        expense: expense,
    }

    return data;
}

async function generateRetainedEarnings(){

    let data = await generateIncomeStatement()

    let totalRevenue = 0;
    let totalExpense = 0;

    console.log(data.expense.TextRow.length)

    for(var i = 0; i < data.expense.TextRow.length;i++){
        console.log(data.expense.TextRow[i])
        totalExpense = totalExpense + data.expense.TextRow[i]
    }

    for(var i = 0; i < data.revenue.TextRow.length;i++){
        console.log(data.revenue.TextRow[i])
        totalRevenue = totalRevenue + data.revenue.TextRow[i]
    }

    return totalRevenue - totalExpense
 
}


module.exports= {
    generateTrialBalance,
    generateBalanceSheet,
    generateIncomeStatement,
    generateRetainedEarnings
}