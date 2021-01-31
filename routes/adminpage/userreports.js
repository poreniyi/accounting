let express = require('express');
let DB = require("/workspaces/accounting/database/DBConnection.js")
let router = express.Router();

let sampleJson={
    users:[{
        Username: "RD2020",
        First:"Red",
        Last:"Delicious",
        DOB:2000,
        email:"apple@mail.com",
        ped:2001,
        DOC:1999,
        Password: "VerySecret",

    },{
        First:"Yellow",
        Last:"Banana",
        DOB:2000,
        email:"kiwi@mail.com",
        ped:2001,
        DOC:1999,
    }]
 }
router.get("/report", async function (req,res,next){
   /*   1
        Database function that returns an array of json objects with the following properties:
        FirstName,LastName,DOB,email address,ped,doc
        and store this value in data
        look at sampleJson above for reference
   */

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

router.get('/edit', (req,res)=>{
  //  http://localhost:3000/admin/edit?user=me?&last=bl&dob=a&email=email&ped=tomorrow&doc=yesterday
    /*  2
        Database function that finds one user from the following properties:
        FirstName,LastName,DOB,email address,ped,doc
        store the result of this function in data
    */
   // store data in some session variable, to be implemented later
    let data = req.query;
    console.log(req.query);
    console.log(req.query.user);
    //res.render('userreports/allusers.ejs',sampleJson);

    res.render('userreports/editpage',req.query);
})
let editPageTest={
    users:[{
        Username:"RD2021",
        First:"Red",
        Last:"Delicious",
        email:"apple@mail.com",
        DOB:2000,
        Password:"Extremelysecretpassword1@",
        Status:"",
    }]
 }
router.get("/editpage", function (req,res){
    let data = editPageTest
    res.render('userreports/editpage',data);
});


module.exports = router;
