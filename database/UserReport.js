const DB = require("./DBConnection");

async function getReport(){

    var query = `
    SELECT USER.USERNAME, USER.FIRSTNAME, USER.LASTNAME, DATE_FORMAT(USER.DOB, "%c/%d/%Y") AS DOB, 
    USER.EMAIL, DATE_FORMAT(USER.PED, "%c/%d/%Y") AS PED,
    DATE_FORMAT(USER.DOC, "%c/%d/%Y") AS DOC, USERTYPE, IF(APPROVED = 1,'Active', 'Inactive') AS APPROVED FROM USER ORDER BY APPROVED, USERTYPE DESC`
      
    let [rows] = await DB.asyncConnection.query(query)
    
    var data= { TextRow: [] }
    
    for(var i = 0; i < [rows][0].length; i++){
        data.TextRow.push([rows][0][i])
    }
    return data;
}

module.exports = { getReport };

