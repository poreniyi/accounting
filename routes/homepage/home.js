var express = require("express");
var passport = require("passport");
const InsertUser = require("../../database/InsertUser");

let crypto=require('crypto');
var router = express.Router();


router.get("/", function (req,res){
    res.redirect("/home");
});

router.get("/home", function (req,res){
    res.render("home/home");
});

router.get("/forgotPassowrd", function (req,res){
    res.render("home/forgotPassword");
});
router.post('/forgotPassword',(req,res)=>{
    
   let token=crypto.randomBytes(50);
   console.log(req.body);
    let userId=req.body.id;
    let email=req.body.email;
   console.log(token.toString('hex'));
   let link=`/reset/:${token.toString('hex')}`;
   console.log(link);
   res.send(`A password reset email for ther user: ${userId} has been sent to ${email}`);
     /*3Database
        add function to insert the token along with a new ped to associated user
     */
     //set up email here to send user link with token

})
router.get('/reset/:token',(req,res)=>{
    /* 4Database
        Replace samplepasslinks with function to query database on token and return a json object if one found
    */
    let samplepasslinks=[`0f4b6378da93d531c979e328b3e9e56d5aca7dee55df14e485790c54ed6f070bbde7dc1ce56be3ee05b363862669a5c632fa`,
    `91a82538c7da494db47a6019f8e472822c56a0017bc929076677644a8cbf91ed1dd1304cd05605bd584aef136e13c241329c`];
    console.log(req.params.token);
    let token=req.params.token;
    if( samplepasslinks.includes(token)){
        res.send(`reset passwordpage`);
        /*database

        */
    }else{
        res.redirect('/');
    }
})
router.post('/reset/:token',(req,res)=>{
    let success = true;
    let newUserPass = 'TBD';
    let token = req.params.token;
    if(success){
        /*5Database
            function to find user by id and update password with newUserPass and set new ped
        */
        res.send(`send`)
    }else{
        res.send(`404`);
    }
})


// router.post ("/login", passport.authenticate("login", {
//    successRedirect: "/",
//    failureRedirect: "/login",
//    failureFlash: true
// }));
// passport authentication, code from documentation page not tested yet

router.get("/signup", function (req,res){
    res.render("home/signup");
});

router.post("/newUser/create", async function (req, res, next){
    let DOB=new Date(req.body.DOB)
    console.log(`The users DOB is ${DOB} and found in the variable dob`);
    let date = new Date()
    let month=("0" + (date.getMonth() + 1)).slice(-2); 
    let day=("0" + (date.getDate())).slice(-2); 
    let DOC = date.getFullYear() + "-" + month + "-" + day;
    
    let userId=`${req.body.first.slice(0,1).toLowerCase()}${req.body.last.replace(/\s+/g, '').toLowerCase()}${month}${date.getFullYear()}`;
    month = ("0" + (date.getMonth() + 4)).slice(-2); 
    let PED = date.getFullYear() + "-" + month + "-" + day;

    let result =  await InsertUser(req.body.userType, userId, req.body.first, req.body.last, DOB, req.body.pass, 
        PED, req.body.email, DOC, req.body.securityQuestion, req.body.answer, req.body.userType)
        if(result){
            res.send("Your request has been submitted. You will receive an email after your account has been approved.")
        }
        else{
            res.send("Email already exists.")
        }
}) 

//route forgot password

//make views corresponding with routes

module.exports = router;