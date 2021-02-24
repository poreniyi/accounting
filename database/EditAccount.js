
const DB = require("./DBConnection");

// used when seeing an accounts details and user wants to update something. Such as category or activate the account
async function editAccount(body, username){

    let query = `CALL Edit_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    let date = new Date()

     await DB.asyncConnection.query(query, [username, date, body.Name, body.Description, body.Normal, body.Category, body.SubCategory, 
        body.InitialBalance, debit, credit, balance, DOC, username, body.Statement, body.Comment, req.status], 
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