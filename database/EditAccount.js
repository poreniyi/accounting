
const DB = require("./DBConnection");

// used when seeing an accounts details and user wants to update something. Such as category or activate the account
async function editAccount(body, username){

    let checkBalance = parseInt(body.Balance,10)

    if(body.Status == '0' && checkBalance != 0){
        return false;
    }

    let query = `CALL Edit_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    let date = new Date()

    let credit =  Math.abs(body.Credit)
    let debit = Math.abs(body.Debit)
    let initialBalance = parseInt(body.InitialBalance,10)

    let balance;

    if(body.Normal == 'Debit'){
        balance = initialBalance + (debit - credit);
    }
    else{
        balance = initialBalance + (credit - debit);
    }

    DB.asyncConnection.query(query, ['admin', date, body.Name, body.Number, body.Description, body.Normal, body.Category, body.SubCategory, 
        initialBalance, debit, credit, balance, username, body.Statement, body.Comment, body.Status], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
    return true
}

// used to add credits and/or debits, which also changes the balance
async function addToAccount(accountName, debit, credit, balance, currentUser){

     let query = `CALL Add_To_Account(?,?,?,?,?,?)`

     let date = new Date()

     DB.asyncConnection.query(query, [accountName, debit, credit, balance, date, currentUser], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    return true

}


module.exports= {
    editAccount,
    addToAccount
}