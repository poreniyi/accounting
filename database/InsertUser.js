
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");



async function emailFound(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer){

    var query = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;

    const [rows] = await DB.asyncConnection.query(query)

    let result = [rows][0][0].emailExists

    if(result == 'false'){
        insertUser(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
            answer)
        return true; // email does not exist so it can be added
    }
    else{
        return false;// email exist and should not be added
    }
}

async function insertUser (username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer){

    password = await encryption.encryptPassword(password)

    query = 'CALL Create_User(?,?,?,?, ?,?,?,?,?,?)';

    DB.asyncConnection.query(query, [username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
}

module.exports = emailFound;