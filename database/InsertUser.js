
const DB = require("./DBConnection");
const encryption = require("../encryption/passwordEncryption");

async function emailFound(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer){

    var query = `SELECT IF ((SELECT EMAIL FROM USER WHERE EMAIL = '${email}') = '${email}', 'true', 'false') as emailExists;`;
   
    let result2 =  DB.asyncConnection.query(query,(err,result,fields)=>{
            if(result){
                newFunction(result[0].emailExists,username, firstName, lastName, DOB, password, PED, email, DOC, question, 
                    answer);
            }
      
    });
    //console.log(result2);
}

let newFunction= (value,username, firstName, lastName, DOB, password, PED, email, DOC, question, 
    answer) =>{
        console.log(value);
    if(value=='false'){
        insertUser(username, firstName, lastName, DOB, password, PED, email, DOC, question, 
            answer);
    }
}
async function insertUser (username, firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer){

    var query = `SET @count := (SELECT COUNT(USERNAME) FROM USER WHERE USERNAME LIKE '${username}%')`;

    DB.asyncConnection.query(query, function (err, result, fields){
        if(err) throw err;
        console.log(`The result of set count@ query is :`)
        console.log(result);

    })

    query = `CALL Create_Username('${username}', @count, @username)`;
    // checks for already existing username and creates a new one if needed

    DB.asyncConnection.query(query, function (err, result, fields){
        if(err) throw err;
        console.log(`The result of callCreate_username query`)
        console.log(result);

    })

    password = await encryption.encryptPassword(password)

    query = 'INSERT INTO USER (USERNAME, FIRSTNAME, LASTNAME, DOB, PASSWORD, PED, EMAIL, DOC,  \
        QUESTION, ANSWER) VALUES (@username,?,?,?,?,?,?,?,?,?)';
        console.log(`The username is ${username}`);
    DB.asyncConnection.query(query, [username,firstName, lastName, DOB, password, PED, email, DOC, question, 
        answer], function (err, result, fields) {
        if (err) throw err;
    });

    // DB.asyncConnection.end();
        return true;
        // user was inserted succesfully
}

module.exports = emailFound;





