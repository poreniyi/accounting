
const DB = require("./DBConnection");

// used when seeing an accounts details and user wants to update something. Such as category or activate the account
async function editAccount(body, username){

    let checkBalance = parseInt(body.Balance,10)

    if(body.Status == '0' && checkBalance != 0){
        return `Denied: that account has a balance greater than 0 so it can't be deactivated`;
    }

    let query = `CALL Edit_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    let credit =  Math.abs(body.Credit)
    let debit = Math.abs(body.Debit)
    let initialBalance = parseInt(body.InitialBalance,10)

    let balance;

    let initial;

    if(body.Balance){
        initial = checkBalance;
    }
    else{
        initial = initialBalance
    }

    if(body.Normal == 'Debit'){
        balance = initial + (debit - credit);
    }
    else{
        balance = initial + (credit - debit);
    }

    let editedBy;
    if(body.Username){
        console.log("you fool" +  body.Username)
        editedBy = body.Username
    }
    else{
        editedBy = 'admin'
    }

    console.log(body.OriginalNumber + "  " +  body.OriginalName+ "  " +  editedBy+ "  " +  body.Name+ "  " +  body.Number+ "  " +  body.Description+ "  " +  
    body.Normal+ "  " +  body.Category+ "  " +  body.SubCategory+ "  " + 
        initialBalance+ "  " +  body.Debit+ "  " +  body.Credit+ "  " +  balance+ "  " +  username+ "  " +  body.Statement+ "  " + body.Comment+ "  " +  body.Status)

    let [rows] = await DB.asyncConnection.query(query, [body.OriginalNumber, body.OriginalName, editedBy, body.Name, body.Number, body.Description, body.Normal, body.Category, body.SubCategory, 
        initialBalance, debit, credit, balance, username, body.Statement, body.Comment, body.Status], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    return [rows][0][0][0].message || [rows][0][2][0].message;
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