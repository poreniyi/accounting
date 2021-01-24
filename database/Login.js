var syncMysql = require("sync-mysql");
const encryption = require("../encryption/passwordEncryption");
const DB = require("./DBConnection");


function login(username, password){

   var query = `SELECT PASSWORD FROM USER WHERE USERNAME = '${username}'`;

   let result = DB.syncConnection.query(query);

   if(decryptPassword(password, result)){
       // login
   }
   else{
        // wrong password
   }

}