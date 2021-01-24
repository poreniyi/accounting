var express = require("express");
var passport = require("passport");
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
    /*Database
        add function to insert token into user table
    */
   let token=crypto.randomBytes(50);
   console.log(req.body);
    let userId=req.body.id;
    let email=req.body.email;
   console.log(token.toString('hex'));
   let link=`/reset/:${token.toString('hex')}`;
   console.log(link);
   res.send(`A password reset email for ther user: ${userId} has been sent to ${email}`);
     /*Database
        add function to insert the token along with a new ped to associated user
     */
     //set up email here to send user link with token

})
router.get('/reset/:token',(req,res)=>{
    /*
        Replace below with function to find database on token and return a json object
    */
    let samplepasslinks=[`0f4b6378da93d531c979e328b3e9e56d5aca7dee55df14e485790c54ed6f070bbde7dc1ce56be3ee05b363862669a5c632fa`,
    `91a82538c7da494db47a6019f8e472822c56a0017bc929076677644a8cbf91ed1dd1304cd05605bd584aef136e13c241329c`];
    console.log(req.params.token);
    let token=req.params.token;
    if( samplepasslinks.includes(token)){
        res.send(`reset passwordpage`);
    }else{
        res.redirect('/');
    }
})

router.get("/login", function (req,res){
    res.render("home/login");
});

router.get("/logout", function (req,res){
    req.logout();
    res.redirect("/home");
});

// router.post ("/login", passport.authenticate("login", {
//    successRedirect: "/",
//    failureRedirect: "/login",
//    failureFlash: true
// }));
// passport authentication, code from documentation page not tested yet

router.get("/signup", function (req,res){
    res.render("home/signup");
});

// router.post("/signup", function (req, res, next){
// signup function goes here
// }) 

//route forgot password

//make views corresponding with routes

module.exports = router;