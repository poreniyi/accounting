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

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/", require("./routes/web")); //route for web front end files
app.use("/api", require("./routes/api")); //route for api


app.listen(app.get("port"), function(){
    console.log("Listening for requests on port " + app.get("port"));
})