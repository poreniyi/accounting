
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");



async function emailFound(table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer){

    var query1 = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;
    var query2 = `SELECT IF ((SELECT EMAIL FROM MANAGER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;

    
    let [rows1] = await DB.asyncConnection.query(query1)
    let result1 = [rows1][0][0].emailExists

    let [rows2] = await DB.asyncConnection.query(query2)
    let result2 = [rows2][0][0].emailExists
    
    if(result1 == 'false' && result2 == 'false'){
        insertUser(table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
            answer)
        return true; // email does not exist so it can be added
    }
    else{
        return false;// email exist and should not be added
    }
}

async function insertUser (table, username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer){

    password = await encryption.encryptPassword(password)

    if(table == 'USER'){
        query = 'CALL Create_User(?,?,?,?,?,?,?,?,?,?)';
    }
    else{
        query = 'CALL Create_Manager(?,?,?,?,?,?,?,?,?,?)';
    }
    DB.asyncConnection.query(query, [username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
}

module.exports = emailFound;