const DB = require("./DBConnection");
const ledger = require("./Ledger");
const journal = require("./Journal");

async function generateTrialBalance(){

    let date = new Date()
    let month=Number(("0" + (date.getMonth() + 1)).slice(-2)); 
    let from = date.getFullYear() + "-" + month + "-01";
    let to = date.getFullYear() + "-" + (month == '12' ? 1 : month+1) + "-01";

    let query = `SELECT NAME, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER ORDER BY CATEGORY DESC`

    let [rows] = await DB.asyncConnection.query(query)

    var data = { TextRow: [] }

    let current
    let current2
    let balance

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]
        balance = 0

        query = `SELECT DEBIT, CREDIT FROM ${current.NAME}_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED < '${to} 00:00:00') ORDER BY DATESUBMITTED ASC;`

        let [rows2] = await DB.asyncConnection.query(query)

        if([rows2][0].length > 0){
            for(var j = 0; j < [rows2][0].length; j++){
                current2 = [rows2][0][j]
                
                if(current2){
                    if(current.COLUMN == 'Debit'){
                        balance = balance + current2.DEBIT
                        balance = balance - current2.CREDIT
                    }
                    else{
                        balance = balance - current2.DEBIT
                        balance = balance + current2.CREDIT
                    } 
                }
            }
        }

        current.BALANCE = balance

        if(current.BALANCE < 0){
            current.BALANCE = "(" + current.BALANCE * -1 + ")"
        }
        data.TextRow.push(current)
    }
    
    return data;
}

async function generateBalanceSheet(start, end, month, quarter, year){

    let from
    let to

    if(start && end){
        from = start;
        to = end;
    }
    else if(month && year){
        from = `${year}-${month}-01`
        to = `${month == '12' ? year+1 : year}-${month == '12' ? 1 : month+1}-01`
    }
    else if(quarter && year){
        from = `${year}-${quarter}-01`
        to = `${quarter == 4 ? year+1 : year}-${quarter == 4 ? 1 : quarter+2}-01`
    }
    else if(year){
        from = `${year}-01-01`
        to = `${year+1}-01-01`
    }
    else{
        return "No date specified."
    }

    let query = `SELECT NAME, CATEGORY, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE
    (CATEGORY = 'ASSET' OR CATEGORY = 'Liability' OR CATEGORY = 'Equity') ORDER BY CATEGORY DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var asset = { TextRow: [] }
    var liability = { TextRow: [] }
    var equity = { TextRow: [] }

    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]

        query = `SELECT BALANCE FROM ${current.NAME}_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED <= '${to} 23:59:59') ORDER BY ID DESC LIMIT 1;`

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
            current.NORMALSIDE=='CREDIT'? current.NORMALSIDE :-current.NORMALSIDE
            asset.TextRow.push(current)
        }
        else if(current.CATEGORY == 'Liability'){
            current.NORMALSIDE=='CREDIT'? current.NORMALSIDE :-current.NORMALSIDE
            liability.TextRow.push(current)
        }else{
            current.COLUMN=='Credit'? current.BALANCE :"(" + current.BALANCE * -1 + ")"
            if(current.COLUMN=='Credit'){
                console.log(current.BALANCE,'blblbblbl')
            }
            if(current.NAME == 'RetainedEarnings'){
                current.BALANCE = await generateRetainedEarnings(from, to)
                console.log(current.BALANCE)
            }
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

    let date = new Date()
    let month=Number(("0" + (date.getMonth() + 1)).slice(-2)); 
    let from = date.getFullYear() + "-" + month + "-01";
    let to = date.getFullYear() + "-" + (month == '12' ? 1 : month+1) + "-01";

    let query = `SELECT NAME, CATEGORY, BALANCE, NORMALSIDE AS 'COLUMN' FROM MASTER WHERE
                (CATEGORY = 'Revenue' OR CATEGORY = 'Expense') ORDER BY CATEGORY DESC;`

    let [rows] = await DB.asyncConnection.query(query)

    var revenue = { TextRow: [] }
    var expense = { TextRow: [] }

    let current
    let current2
    let balance

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]
        balance = 0

        query = `SELECT DEBIT, CREDIT FROM ${current.NAME}_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED < '${to} 00:00:00') ORDER BY DATESUBMITTED ASC;`

        let [rows2] = await DB.asyncConnection.query(query)

        if([rows2][0].length > 0){
            for(var j = 0; j < [rows2][0].length; j++){
                current2 = [rows2][0][j]
                
                if(current2){
                    if(current.COLUMN == 'Debit'){
                        balance = balance + current2.DEBIT
                        balance = balance - current2.CREDIT
                    }
                    else{
                        balance = balance - current2.DEBIT
                        balance = balance + current2.CREDIT
                    } 
                }
            }
        }

        current.BALANCE = balance

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

async function generateRetainedEarnings(from, to){

    let query = `SELECT BALANCE FROM RETAINEDEARNINGS_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED <= '${to} 23:59:59') ORDER BY DATESUBMITTED DESC LIMIT 1;`

    let [rows2] = await DB.asyncConnection.query(query)

    return [rows2][0][0] != null ? [rows2][0][0].BALANCE : 0
}

async function getPreviousRE(){

    let query = `
    SELECT MASTER.NAME, MASTER.NORMALSIDE AS 'COLUMN', MASTER.CATEGORY,JOURNAL.DEBIT, JOURNAL.CREDIT, JOURNAL.DATE, JOURNAL.ID, JOURNAL.USERNAME FROM MASTER  
    JOIN JOURNAL ON JOURNAL.ACCOUNT = MASTER.NAME AND 
    (MASTER.CATEGORY = 'REVENUE' OR MASTER.CATEGORY = 'EXPENSE') GROUP BY DATE ASC;
    `

    let [rows] = await DB.asyncConnection.query(query)

    let current
    let current2

    let expense = 0
    let revenue = 0
    let total = 0
    var i =0
    var skip =0
    let date1
    let date2

    for(; i < [rows][0].length; i++){
        current = [rows][0][i];
        expense = 0
        revenue = 0
        total = 0
        skip = 0
        let debit = 0
        let credit = 0
        date1 = current.DATE.getFullYear() + "-" + Number(current.DATE.getMonth()+1)

         if(current.CATEGORY == 'Expense'){
                    if(current.COLUMN == 'Debit'){
                        expense += current.DEBIT
                        expense -= current.CREDIT
                    }
                    else{
                        expense -= current.DEBIT
                        expense += current.CREDIT
                    }
                    
                }
                else{
                    if(current.COLUMN == 'Debit'){
                        revenue += current.DEBIT
                        revenue -= current.CREDIT
                    }
                    else{
                        revenue -= current.DEBIT
                         revenue+= current.CREDIT
                    }
                }
                let id = await journal.getTransactionID()
                await journal.createTransaction(current.USERNAME, current.NAME, 'Closing account', current.DEBIT == 0 ? current.CREDIT : 0, current.CREDIT == 0 ? current.DEBIT : 0, id, current.DATE)
        for(var j = i+1; j < [rows][0].length; j++){
            current2 = [rows][0][j]
            date2 = current2.DATE.getFullYear() + "-" + Number(current2.DATE.getMonth()+1)
            if(date1 == date2){
                if(current2.CATEGORY == 'Expense'){
                    if(current.COLUMN == 'Debit'){
                        expense += current2.DEBIT
                        expense -= current2.CREDIT
                    }
                    else{
                        expense -= current2.DEBIT
                        expense += current2.CREDIT
                    }
                    
                }
                else{
                    if(current2.COLUMN == 'Debit'){
                        revenue += current2.DEBIT
                        revenue -= current2.CREDIT
                    }
                    else{
                        revenue -= current2.DEBIT
                         revenue+= current2.CREDIT
                    }
                }
                skip++
                await journal.createTransaction(current2.USERNAME, current2.NAME, 'Closing account', current2.DEBIT == 0 ? current2.CREDIT : 0, current2.CREDIT == 0 ? current2.DEBIT : 0, id, current2.DATE)
            } 
        }
        i += skip
        total = revenue - expense

        let year = current.DATE.getFullYear()

        let month = current.DATE.getMonth()+1
        let day = new Date(year, month, 0).toString().substring(8,10);

        let from = year+"-"+month+"-01"

        let to = year+"-"+month+"-"+day

        await journal.createTransaction(current.USERNAME, 'RetainedEarnings', 'Closing account', total < 0 ? total*-1 : 0, total >= 0 ? total : 0, id, current.DATE)
        await ledger.addOLDERTransactionToLedger(from , to, current.USERNAME, "Auto Added", total < 0 ? total*-1 : 0, total >= 0 ? total : 0, id, '', 'Approved')
    }
}

// getPreviousRE()


module.exports= {
    generateTrialBalance,
    generateBalanceSheet,
    generateIncomeStatement,
    generateRetainedEarnings
}