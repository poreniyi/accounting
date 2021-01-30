const encryption = require("../encryption/passwordEncryption");
const DB = require("./DBConnection");

login('qqq012021','Guasacaca1-')

async function login(username, password){

    let DBPassword;

   var query1 = `SELECT PASSWORD AS password FROM USER WHERE USERNAME = '${username}'`;

   let result1 = await DB.asyncConnection.query(query1);

   console.log(result1[0])

   if(result1[0] == ''){

        var query2 = `SELECT PASSWORD AS password FROM MANAGER WHERE USERNAME = '${username}'`;
        let result2 = await DB.asyncConnection.query(query2);

        if(result2[0] == ''){
            console.log("USER NOT FOUND")
            return false; // user not found
        }
        else{
            DBPassword = result2[0][0].password
        }
   }
   else{
       DBPassword = result1[0][0].password
   }

   console.log("DBPassword" + DBPassword)

   if(encryption.decryptPassword(password, DBPassword)){
       // login
       console.log("CORRECT PASSWORD")
   }
   else{
    console.log("WRONG PASSWORD")
        // wrong password
   }

}