
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");
const sendEmail= require('../email/emailExample').sendEmail;



async function emailFound(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer, userType, approved){

    let query = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;

    let [rows] = await DB.asyncConnection.query(query)
    let result = [rows][0][0].emailExists
    
    if(result == 'false'){
        insertUser(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
            answer, userType, approved)
            //email sent to
            sendEmail('MancaraAppDomain@outlook.com','account creation',`${username} with email of ${email} has just requested to make an account wwith
             type ${userType}`) 
        return true; // email does not exist so it can be added
    }
    else{
        return false;// email exist and should not be added
    }
}

async function insertUser (username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer, userType, approved){

    let query;

    if(password != 'DEFAULTPASS1-'){
        password = await encryption.encryptPassword(password)
        query = 'CALL Create_User(?,?,?,?,?,?,?,?,?,?,?,?)';
    }
    else{
        password = await encryption.encryptPassword(password)
        query = 'CALL ADMIN_Create_User(?,?,?,?,?,?,?,?,?,?,?)';
    }

    DB.asyncConnection.query(query, [username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer, userType, approved], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                throw err;
            } 
    });
}

module.exports = emailFound;