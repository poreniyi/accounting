const DB = require("./DBConnection");

async function updateUser(username, firstname, lastname, DOB, PED, email, usertype, approved){

    let query = `UPDATE USER SET FIRSTNAME = ?, LASTNAME = ?, DOB = ?, PED = ?, 
                EMAIL = ?, USERTYPE = ?, APPROVED = ? WHERE USERNAME = ?`

    DOB=new Date(DOB)
    PED=new Date(PED)

    DB.asyncConnection.query(query, [firstname, lastname, DOB, PED, email, usertype, approved, username], function (err, result, fields) {
            if(err){
                console.log("Query failed")
                console.log(err)
                return false;
            } 
    });  
    return true
}

module.exports = {updateUser};