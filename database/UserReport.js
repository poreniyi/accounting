const DB = require("./DBConnection");

async function getReport(){

    var query = `
    SELECT USER.USERNAME, USER.FIRSTNAME, USER.LASTNAME, DATE_FORMAT(USER.DOB, "%m/%d/%Y") AS DOB, 
    USER.EMAIL, DATE_FORMAT(USER.PED, "%c/%d/%Y") AS PED,
    DATE_FORMAT(USER.DOC, "%c/%d/%Y") AS DOC, IF(APPROVED = 1,'Active', 'Inactive') AS APPROVED, USERTYPE FROM USER 
    WHERE USERTYPE = 'Accountant' OR USERTYPE = 'Manager' ORDER BY APPROVED DESC, USERTYPE ASC`
      
    let [rows] = await DB.asyncConnection.query(query)
    
    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }
    return data;
}

async function getLastLogin(username){

    let query = `SELECT DATE_FORMAT(LAST_LOGIN, '%m/%d/%Y') AS LAST_LOGIN FROM USER WHERE USERNAME = '${username}'`
      
    let [rows] = await DB.asyncConnection.query(query)
    
    return [rows][0][0].LAST_LOGIN

}

module.exports = { 
    getReport:getReport, 
    getLastLogin:getLastLogin 
};

