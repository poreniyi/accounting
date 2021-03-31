//Entry point for app
var express = require("express");
var path = require("path");
require('dotenv').config();
let passport= require('passport');
require('./passport/passportConfig')(passport);
let session = require("express-session");
const MongoClient=require('mongodb').MongoClient;



var app = express();

//database connection goes here
MongoCLient.connect(process.env.mongo_uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(client=>{
    const db=client.db('Transactions');
    app.locals.db=db;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'frontendassets')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set('trust proxy', 1) // trust first proxy
const MongoStore= require('connect-mongo')(session);
app.use(session({ 
    store:new MongoStore({
                            url:process.env.mongo_uri,
                            ttl:2 * 24 * 60 * 60,//amount of time to save session in seconds
                        stringify:false}), 
    secret: process.env.session_secret,
    resave:true,
    saveUninitialized:false,}));
app.use(passport.initialize());
app.use(passport.session());




app.use("/", require("./routes/homepage")); //route for web front end files
app.use("/admin", require("./routes/adminpage")); //route for admin files
app.use("/accountant", require("./routes/accountantpages")); //route for accountant files
app.use("/manager", require("./routes/managerpages")); //route for manager files



app.use((req,res,next) => {
    res.status(404).render(`home/404`);//this needs to be last
})




app.listen(app.get("port"), function(){
    console.log("Listening for requests on port " + app.get("port"));
})