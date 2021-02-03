const encryption = require("../encryption/passwordEncryption");
const DB = require("./DBConnection");

login('gg012021-17','Guasacaca1')

async function login(username, password){

    let DBPassword;

   var query1 = `SELECT PASSWORD AS password FROM USER WHERE USERNAME = '${username}'`;

   let [result1] = await DB.asyncConnection.query(query1);

   if([result1][0][0] != ''){ // it's a user
        DBPassword = [result1][0][0][0].password
   }
    else{
        console.log('USERNAME NOT FOUND')
        return false;
   }

   let check = await encryption.decryptPassword(password, DBPassword)

   console.log('CHECK: ' + check)

   if(check){
       // login
       return true;
   }
   else{
        // wrong password
        return false;
   }

}