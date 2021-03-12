
const DB = require("./DBConnection");

// used when seeing an accounts details and user wants to update something. Such as category or activate the account
async function editAccount(body, username, madeByTransaction){

    let checkBalance = parseInt(body.Balance,10)

    console.log(checkBalance)

    if(body.Status == '0' && checkBalance != 0){
        return `Denied: that account has a balance greater than 0 so it can't be deactivated`;
    }

    let query = `CALL Edit_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    let credit =  Math.abs(body.Credit)
    let debit = Math.abs(body.Debit)
    let initialBalance = parseInt(body.InitialBalance,10)

    let balance;

    let initial;

    if(madeByTransaction){

        if(body.Balance){
            initial = checkBalance;
            console.log('EEEEEEE')
        }
        else{
            initial = initialBalance
            console.log('RRRRRRRRRRR')
        }

        console.log(initial)
        console.log(body.Normal)
        if(body.Normal == 'Debit'){
            balance = initial + (debit - credit);
            console.log('OOOOOOO')
        }
        else{
            balance = initial + (credit - debit);
            console.log('PPPPPPP')
        }
    }
    else{
        balance = body.Balance
    }
    console.log(balance)
    console.log(debit)
    console.log(credit)
    console.log(balance)

    let [rows] = await DB.asyncConnection.query(query, [body.OriginalNumber, body.OriginalName, username, body.Name, body.Number, body.Description, body.Normal, body.Category, body.SubCategory, 
        initialBalance, debit, credit, balance, body.Username, body.Statement, body.Comment, body.Status], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    return [rows][0][0][0].message || [rows][0][2][0].message;
}

module.exports= {
    editAccount,
}