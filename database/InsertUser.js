
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");

function emailFound(email){

    var query = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;
   
    let result = DB.syncConnection.query(query);

     if (result[0].emailExists == 'true'){
         return true;
     }
     else{
         return false;
    }
}

async function insertUser (username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer){

    if(emailFound(email)){
        console.log("EMAIL EXISTS")
        return false;
        // Email is already linked to another user. Therefore, the account cannot be created
    }

    var query = `SET @count := (SELECT COUNT(USERNAME) FROM USER WHERE USERNAME LIKE '${username}%')`;

    DB.asyncConnection.query(query, function (err, result, fields){
        if(err) throw err;
    })

    query = `CALL Create_Username('${username}', @count, @username)`;
    // checks for already existing username and creates a new one if needed

    DB.asyncConnection.query(query, function (err, result, fields){
        if(err) throw err;
    })

    password = await encryption.encryptPassword(password)

    query = 'INSERT INTO USER (USERNAME, FIRSTNAME, LASTNAME, DOB, PASSWORD, PED, EMAIL, DOC,  \
        QUESTION, ANSWER) VALUES (@username,?,?,?,?,?,?,?,?,?)';

    DB.asyncConnection.query(query, [firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer], function (err, result, fields) {
        if (err) throw err;
    });

    DB.asyncConnection.end();
        return true;
        // user was inserted succesfully
}

module.exports = insertUser;





