
const DB = require("./DBConnection");

async function accountExists(accountName){

    console.log(accountName)

    let query = `SELECT count(*) AS itExists FROM information_schema.tables WHERE table_schema = 'heroku_f886e82f73ac5d5'
                 AND table_name = '${accountName}';`

    let [rows] = await DB.asyncConnection.query(query)

    if([rows][0][0].itExists == 1){
        return true
    }
    else{
        return false
    }

}

async function createAccount(accountName, description, normalSide, category, subcategory, 
    initialBalance, debit, credit, balance, DOC, username, orderNumber, statement, comment, active){

    if (accountExists(accountName) == true){
        return false //'Account name already exists'
    }

    let  query = `
    CREATE TABLE ${accountName} (
    
    NAME			VARCHAR(40)		UNIQUE,
    NUMBER			INT				UNIQUE	NOT NULL PRIMARY KEY,
    DESCRIPTION		TINYTEXT		NOT NULL,
    NORMALSIDE		BOOLEAN			NOT NULL,
    CATEGORY		VARCHAR(50)		NOT NULL,
    SUBCATEGORY		VARCHAR(50)		NOT NULL,
    INITIALBALANCE	DOUBLE			UNIQUE	NOT NULL,
    DEBIT			LONGTEXT		NOT NULL,
    CREDIT			LONGTEXT		NOT NULL,
    BALANCE			DOUBLE			NOT NULL,
    DOC				DATE			NOT NULL,
    USERNAME		VARCHAR(40)		NOT NULL,
    ORDERNUMBER		INT				NOT NULL,
    STATEMENT		INT				NOT NULL,
    COMMENT			TINYTEXT		NOT NULL,
    ACTIVE          BOOLEAN         NOT NULL,
    
    FOREIGN KEY(USERNAME) REFERENCES USER(USERNAME)
    );`

     await DB.asyncConnection.query(query)

     query = `CALL Create_Account(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

     DB.asyncConnection.query(query, [accountName, description, normalSide, category, subcategory, 
        initialBalance, debit, credit, balance, DOC, username, orderNumber, statement, comment, active], 
        function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });

    return true

}

createAccount('Cash', 'Am', 1, 'Asset', 'Subcategory', 120, 'J', 'J',
2343, '2020-01-01', 'admin', 01, 1, 'A', 1)

