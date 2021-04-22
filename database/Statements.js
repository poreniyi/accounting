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

        query = `SELECT DEBIT, CREDIT FROM ${current.NAME}_LEDGER WHERE (DATESUBMITTED >=  DATE_FORMAT(STR_TO_DATE('${from}', '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:%s') AND DATESUBMITTED < DATE_FORMAT(STR_TO_DATE('${to}', '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) ORDER BY DATESUBMITTED ASC;
        `
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

async function generateBalanceSheet(start, end){

    let from
    let to

    if(start && end){ 
        let d = new Date(end)
        let year = d.getFullYear()
        let month = d.getMonth()+1
        
        let day = d.getDate()+1
    
        from = start
        to = year + "-" + month + "-" + day

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
    let balance

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]
         balance = 0

         query = `SELECT DEBIT, CREDIT FROM ${current.NAME}_LEDGER WHERE (DATESUBMITTED >=  DATE_FORMAT(STR_TO_DATE('${from}', '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:%s') AND DATESUBMITTED <= DATE_FORMAT(STR_TO_DATE('${to}', '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) ORDER BY DATESUBMITTED ASC;`
        // console.log(query)
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

        if(rows2.length > 0){
            if(current.BALANCE < 0)
                current.BALANCE = "(" + current.BALANCE * -1 + ")"
        }
        else{
            current.BALANCE = 0
        }
        if(current.CATEGORY == 'Asset'){
           // current.BALANCE = (current.COLUMN=='CREDIT'? current.COLUMN : current.COLUMN * -1)
            asset.TextRow.push(current)
        }
        else if(current.CATEGORY == 'Liability'){
           // current.balanace = current.COLUMN=='CREDIT'? current.COLUMN :-current.COLUMN
            liability.TextRow.push(current)
        }else{
            current.BALANCE = (current.COLUMN=='Credit'? current.BALANCE : "(" + current.BALANCE * -1 + ")")
            if(current.NAME == 'RetainedEarnings'){

                query = `SELECT BALANCE FROM RETAINEDEARNINGS_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED <= '${to} 23:59:59') ORDER BY DATESUBMITTED DESC LIMIT 1;`
                
                let [rows3] = await DB.asyncConnection.query(query)

                if([rows3][0][0]){
                    if([rows3][0][0].DEBIT == 0){
                        current.BALANCE = [rows3][0][0].BALANCE
                    }
                    else{
                        current.BALANCE = [rows3][0][0].BALANCE
                    }
                }
                else{
                   current.BALANCE = 0
                }
            }
            equity.TextRow.push(current)
        }
    }

    let data = {
        asset: asset,
        liability: liability,
        equity: equity
    }
    //console.log(data.asset)

    //console.log(data.liability)

    //console.log(data.equity)

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

async function generateRetainedEarnings(){

    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth()+1
    let day = new Date(year, month, 0).toString().substring(8,10);

    let from = year+"-"+month+"-01"

    let to = year+"-"+month+"-"+day

    let query = `SELECT DEBIT, CREDIT FROM RETAINEDEARNINGS_LEDGER WHERE (DATESUBMITTED >= '${from} 00:00:00' AND DATESUBMITTED <= '${to} 23:59:59') ORDER BY DATESUBMITTED DESC LIMIT 1;`
    
    let [rows2] = await DB.asyncConnection.query(query)

    if([rows2][0][0]){
        if([rows2][0][0].DEBIT == 0){
            return [rows2][0][0].CREDIT
        }
        else{
            return [rows2][0][0].DEBIT * -1
        }
    }
    return 0
}


async function getPreviousRE(){

    let query = `CALL GETRE()`

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

    
    for(; i < [rows][0][0].length; i++){
        
        current = [rows][0][0][i];
        expense = 0
        revenue = 0
        total = 0
        skip = 0

        let year = current.DATE.getFullYear()

        let month = current.DATE.getMonth()+1
        let day = new Date(year, month, 0).toString().substring(8,10);

        let from = year+"-"+month+"-01"

        let to = year+"-"+month+"-"+day

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
        await ledger.addOLDERTransactionToLedger(current.NAME, from , to, current.USERNAME, "Closing account", current.DEBIT == 0 ? current.CREDIT : 0, current.CREDIT == 0 ? current.DEBIT : 0, id, 'OLDER', 'Approved')

        for(var j = i+1; j < [rows][0][0].length; j++){
            current2 = [rows][0][0][j]
            date2 = current2.DATE.getFullYear() + "-" + Number(current2.DATE.getMonth()+1)
            if(date1 == date2){
                if(current2.CATEGORY == 'Expense'){
                    if(current2.COLUMN == 'Debit'){

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
               await ledger.addOLDERTransactionToLedger(current2.NAME, from , to, current2.USERNAME, "Closing account", current2.DEBIT == 0 ? current2.CREDIT : 0, current2.CREDIT == 0 ? current2.DEBIT : 0, id, 'OLDER', 'Approved')
            } 
        }
        i += skip
        total = revenue - expense

        await journal.createTransaction(current.USERNAME, 'RetainedEarnings', 'Closing account', total < 0 ? total*-1 : 0, total >= 0 ? total : 0, id, current.DATE)
        await ledger.addOLDERTransactionToLedger('RetainedEarnings', from , to, current.USERNAME, "Auto Added", total < 0 ? total*-1 : 0, total >= 0 ? total : 0, id, 'OLDER', 'Approved')
    }
}

async function close(){

    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth()+1
    let day = new Date(year, month, 0).toString().substring(8,10);

    let from = year+"-"+month+"-01"

    let to = year+"-"+month+"-"+day

    let query = `CALL close(?,?)`

    let [rows] = await DB.asyncConnection.query(query, [from, to], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                console.log(err)
                throw err;
            } 
    });

    let current

    let expense = 0
    let revenue = 0
    let total = 0

    let id = await journal.getTransactionID()
    
    for(var i =0; i < [rows][0][0].length; i++){
        
        current = [rows][0][0][i];

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

        total = revenue - expense
        await journal.createTransaction(current.USERNAME, current.NAME, 'Closing account', current.DEBIT == 0 ? current.CREDIT : 0, current.CREDIT == 0 ? current.DEBIT : 0, id, current.DATE)
    }
    await journal.createTransaction(current.USERNAME, 'RetainedEarnings', 'Closing account', total < 0 ? total*-1 : 0, total >= 0 ? total : 0, id, current.DATE)
    await ledger.addTransactionToLedger(current.USERNAME, id, '', 'Approved')
}

module.exports= {
    generateTrialBalance,
    generateBalanceSheet,
    generateIncomeStatement,
    generateRetainedEarnings,
    getPreviousRE,
    close
}