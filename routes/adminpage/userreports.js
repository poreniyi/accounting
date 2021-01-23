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
   /*
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
    /*
        Database function that finds one user from the following properties:
        FirstName,LastName,DOB,email address,ped,doc
        store the result of this function in data
    */
   // store data in some session variable, to be implemented later
   let data;
   if(false) res.send('404');
   console.log(req.query);
    console.log(req.query.user);
    //res.render('userreports/allusers.ejs',sampleJson);

    res.send('displaying user to be added here');
})


module.exports = router;
