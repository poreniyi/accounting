//Entry point for app
var express = require("express");
var path = require("path");
var passport = require("passport");
//var flash = require("connect-flash");
var session = require("express-session");
//create a passport setup file


var app = express();

//database connection goes here
//passport setup goes here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'frontendassets')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./routes/homepage")); //route for web front end files


app.listen(app.get("port"), function(){
    console.log("Listening for requests on port " + app.get("port"));
})