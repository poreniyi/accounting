const DB = require("./DBConnection");

async function updateUser(username, firstname, lastname, ped, email, usertype, approved){

    let query = `UPDATE USER SET FIRSTNAME = '${firstname}', LASTNAME = '${lastname}', PED = '${ped}', 
                EMAIL = '${email}', USERTYPE = '${usertype}', APPROVED = ${approved} WHERE USERNAME = '${username}'`

    DB.asyncConnection.query(query, [username, firstname, lastname, ped, email, usertype, approved], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                console.log(err)
                return false;
            } 
    });  
    return true
}

module.exports = {updateUser};