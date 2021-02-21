
const DB = require("./DBConnection");

// used when seeing an accounts details and user wants to update something. Such as category or activate the account
async function editAccount(currentUser, date, accountName, number, description, normalSide, category, subcategory, 
    initialBalance, debit, credit, balance, DOC, username, orderNumber, statement, comment, active){

    let query = `CALL Edit_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

     DB.asyncConnection.query(query, [currentUser, date, accountName, number, description, normalSide, category, subcategory, 
        initialBalance, debit, credit, balance, DOC, username, orderNumber, statement, comment, active], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    return true
}

// used to add credits and/or debits, which also changes the balance
async function addToAccount(accountName, debit, credit, balance, currentUser, date){

     let query = `CALL Add_To_Account(?,?,?,?,?,?)`

     DB.asyncConnection.query(query, [accountName, debit, credit, balance,currentUser, date], 
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