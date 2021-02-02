let express = require('express');
let DB = require("../../database/DBConnection.js")
let router = express.Router();

router.get("/report", async function (req,res,next){

  var query = `
  SELECT USER.USERNAME, USER.FIRSTNAME, USER.LASTNAME, DATE_FORMAT(USER.DOB, "%c/%d/%Y") AS DOB, 
    USER.PASSWORD, USER.EMAIL, DATE_FORMAT(USER.PED, "%c/%d/%Y") AS PED,
    DATE_FORMAT(USER.DOC, "%c/%d/%Y") AS DOC FROM USER JOIN PENDING_USER ON
    USER.USERNAME = PENDING_USER.USERNAME 
UNION 
SELECT MANAGER.USERNAME, MANAGER.FIRSTNAME, MANAGER.LASTNAME, DATE_FORMAT(MANAGER.DOB, "%c/%d/%Y") AS DOB, 
    MANAGER.PASSWORD, MANAGER.EMAIL, DATE_FORMAT(MANAGER.PED, "%c/%d/%Y") AS PED,
    DATE_FORMAT(MANAGER.DOC, "%c/%d/%Y") AS DOC 
    FROM MANAGER JOIN PENDING_MANAGER ON MANAGER.USERNAME = PENDING_MANAGER.USERNAME`
    
  let [rows] = await DB.asyncConnection.query(query)

  var data={ TextRow: [] }

  for(var i = 0; i < [rows][0].length; i++){
      data.TextRow.push([rows][0][i])
  }
    res.render('userreports/allusers.ejs',data);
});

router.get('editUser',()=>{
    redirect('/edit');
})

router.get('/edit', (req,res)=>{
    res.render('userreports/editpage',req.query);
})

module.exports = router;
