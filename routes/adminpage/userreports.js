let express = require('express');
let DB = require("/workspaces/accounting/database/DBConnection.js")
let router = express.Router();

router.get("/report", async function (req,res,next){

  var query = `SELECT USER.USERNAME, FIRSTNAME, LASTNAME, DATE_FORMAT(DOB, "%c/%d/%Y") AS DOB, PASSWORD, EMAIL, DATE_FORMAT(PED, "%c/%d/%Y") AS PED,
  DATE_FORMAT(DOC, "%c/%d/%Y") AS DOC FROM USER JOIN PENDING_USER ON USER.USERNAME = PENDING_USER.USERNAME`
    
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

router.get("/editpage", function (req,res){
    let data = editPageTest
    res.render('userreports/editpage',data);
});


module.exports = router;
