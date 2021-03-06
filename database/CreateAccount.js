
const DB = require("./DBConnection");

async function accountExists(accountName, accountNumber){

    let query = `
                 SELECT count(*) AS nameExists FROM information_schema.tables WHERE table_schema = 'heroku_f886e82f73ac5d5'
                 AND table_name = '${accountName}'`

    let query2 = ` SELECT count(*) AS numberExists FROM MASTER WHERE NUMBER = ${accountNumber};`

    let [rows] = await DB.asyncConnection.query(query)

    let [rows2] = await DB.asyncConnection.query(query2)

    if([rows][0][0].nameExists == '1'){
        return 'Account name already exists' 
    }
    else if([rows2][0][0].numberExists == '1'){
        return 'Account number already exists' 
    }
    else{
        return false;
    }

}

async function createAccount(body, username){

    body.Name=body.Name.replace("'","");
    body.Name=body.Name.replace(' ','_');

    let exists = await accountExists(body.Name, body.Number) 

    if (exists != false){
        return exists
    }
  
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

    let statement;

    if(body.Category == 'Asset' || body.Category == 'Liability' || body.Category == 'Equity'){
        statement = 'Balance Sheet'
    }
    else{
        statement = 'Income Statement'
    }

    let  query = `
    CREATE TABLE ${body.Name} (
    
    NAME			VARCHAR(40),
    NUMBER			INT				NOT NULL,
    DESCRIPTION		TINYTEXT		NOT NULL,
    NORMALSIDE		VARCHAR(10)		NOT NULL,
    CATEGORY		VARCHAR(50)		NOT NULL,
    SUBCATEGORY		VARCHAR(50)		NOT NULL,
    INITIALBALANCE	DOUBLE			DEFAULT 0,
    DEBIT           DOUBLE          DEFAULT 0,
    CREDIT          DOUBLE         DEFAULT 0,
    BALANCE			DOUBLE			NOT NULL,
    DOC				TIMESTAMP		NOT NULL,
    USERNAME		VARCHAR(40)		NOT NULL,
    STATEMENT		VARCHAR(50)		NOT NULL,
    COMMENT			VARCHAR(500)	DEFAULT '',
    STATUS          BOOLEAN         NOT NULL,
    EVENTID         VARCHAR(80)     NOT NULL
    );`

     await DB.asyncConnection.query(query)

     query = `CALL Create_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

     console.log(body.Name+ " -  " + body.Number+ " -  " +  body.Description+ " -  " +  body.Normal+ " -  " +  body.Category+ " -  " + 
      body.SubCategory + " -  " + 
        body.InitialBalance + " -  " + debit+ " -  " +  credit+ " -  " +  balance + " -  " + 
        username+ " -  " +  statement+ " -  " +  body.Comment)

     await DB.asyncConnection.query(query, [body.Name, body.Number, body.Description, body.Normal, body.Category, body.SubCategory, 
        body.InitialBalance, debit, credit, balance, username, statement, body.Comment, 1], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });


    return 'Account created succesfully'

}

module.exports= {
    createAccount:createAccount
}