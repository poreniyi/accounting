let express = require('express');
let router = express.Router();

let sampleJson={
    users:[{
        First:"Red",
        Last:"Delicious",
        DOB:2000,
        email:"apple@mail.com",
        ped:2001,
        DOC:1999,
    },{
        First:"Yellow",
        Last:"Banana",
        DOB:2000,
        email:"kiwi@mail.com",
        ped:2001,
        DOC:1999,
    }]
 }
router.get("/report", (req,res,next)=>{
   /*   1
        Database function that returns an array of json objects with the following properties:
        FirstName,LastName,DOB,email address,ped,doc
        and store this value in data
        look at sampleJson above for reference
   */
    let data=sampleJson;
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
   if(false) res.send('404');
   console.log(req.query);
    console.log(req.query.user);
    //res.render('userreports/allusers.ejs',sampleJson);

    res.render('userreports/editpage',data);
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
