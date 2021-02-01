//Entry point for app

require('dotenv').config();
let express= require('express');
let path= require('path');
let passport= require('passport');
require('./passportSetup/passportConfig')(passport);
let session = require("express-session");


var app = express();

//database connection goes here
let mongoose=require('mongoose');
const MongoStore= require('connect-mongo')(session);
mongoose.connection.on('connecting',()=>{
    `Connected to the mongo database`;
})
mongoose.connection.on('error',()=>{
    console.log(err);
})
mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true,useUnifiedTopology:true },()=>{
 });
 mongoose.connection.on('open',()=>{
    console.log(`Connection opened to the Mongo Database`);
})
mongoose.connection.on('disconnected',()=>{
    console.log(`Connection closed`);
})
mongoose.connection.on('disconnecting',()=>{
    console.log(`Connection closed`);
})
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'frontendassets')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store:new MongoStore({mongooseConnection:mongoose.connection}), 
    secret: "cats",
    resave:true,
    saveUninitialized:false,
    maxAge:2*24*60*60*1000 }));// days*hours*minutes*seconds*miliseonds
app.use(passport.initialize());
app.use(passport.session());



app.use("/", require("./routes/homepage")); //route for web front end files
app.use("/admin", require("./routes/adminpage")); //route for admin files


app.use((req,res,next) => {
    res.status(404).render(`home/404`);//this needs to be last
})




app.listen(app.get("port"), function(){
    console.log("Listening for requests on port " + app.get("port"));
})