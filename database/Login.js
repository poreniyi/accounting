const DB = require("./DBConnection");

async function login(username){

   var query = `SELECT USERNAME, USERTYPE, PASSWORD, APPROVED FROM USER WHERE USERNAME = '${username}'`;

   let [result] = await DB.asyncConnection.query(query);

   let data;

   if([result][0][0]){ 
        data = [[result][0][0].USERNAME, [result][0][0].PASSWORD, [result][0][0].USERTYPE, [result][0][0].APPROVED]
        return data
   }
    else{
        console.log('USERNAME NOT FOUND')
        return;
   }
}

async function findUser(username){

     var query = `SELECT USERNAME FROM USER WHERE USERNAME = '${username}'`;

     let [result] = await DB.asyncConnection.query(query);

     return [result][0][0].USERNAME
}

module.exports = {login, findUser}
