var express = require("express");
var passport = require("passport");

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

// router.post("/signup", function (req, res, next){
// signup function goes here
// }) 

module.exports = router;