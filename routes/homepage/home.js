var express = require("express");
var passport = require("passport");
const InsertUser = require("../../database/InsertUser");

var router = express.Router();


router.get("/", function (req,res){
    res.redirect("/home");
});

router.get("/home", function (req,res){
    res.render("home/home");
});

router.get("/about", function (req,res){
    res.render("home/forgotPassword");
});

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

router.post("/newUser/create", function (req, res, next){
    console.log(req.body);
    let date=new Date();
    let month=("0" + (date.getMonth() + 1)).slice(-2); 
    let userId=`${req.body.first.slice(0,1).toLowerCase()}${req.body.last.replace(/\s+/g, '').toLowerCase()}${month}${date.getFullYear()}`;
    let DBResult = InsertUser(userId, req.body.first, req.body.last, date, req.body.pass, 
        date, req.body.email, date, 'question', 'answer')
    DBResult.then(function(result){
        if(result){
            res.send('Your request has been submitted. You will receive an email after you account has been approved.');
        }
        else{
            res.send('Email already exists');
            return "This email is already linked to an existing account."
        }
    })
}) 

//route forgot password

//make views corresponding with routes

module.exports = router;