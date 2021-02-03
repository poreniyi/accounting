
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");



async function emailFound(table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer, userType){

    let query = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;

    let [rows] = await DB.asyncConnection.query(query)
    let result = [rows][0][0].emailExists
    
    if(result == 'false'){
        insertUser(table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
            answer, userType)
        return true; // email does not exist so it can be added
    }
    else{
        return false;// email exist and should not be added
    }
}

async function insertUser (table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer, userType){

    password = await encryption.encryptPassword(password)

    let query = 'CALL Create_User(?,?,?,?,?,?,?,?,?,?,?)';

    DB.asyncConnection.query(query, [username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer, userType], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
}

module.exports = emailFound;