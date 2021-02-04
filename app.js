//Entry point for app
var express = require("express");
var path = require("path");
var passport = require("passport");
let passportLocal = require('passport-local');
let session = require("express-session");
let login = require("./database/Login")
const encryption = require("./encryption/passwordEncryption");
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

app.set('trust proxy', 1) // trust first proxy
app.use(session({ 
    secret: "cats",
resave:true,
saveUninitialized:false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((data, done) => {
    console.log(`Serializing user`);
    done(null,data[0]); // data[0] = username
})


passport.deserializeUser( async (username, done) => {

    let DBUsername = await login.findUser(username)
    if(DBUsername == username){
        done(null,username);
    }
   
})

passport.use(new passportLocal({
}, async (username,password,done)=>{
    let data = await login.login(username, password) // data[0] = username, data[1] = password, data[2] = usertype
    if(!data){
        console.log('APP.JS   username not found')
        return done(null, false)
    }
    let checkPassword = await encryption.decryptPassword(password, data[1])
    console.log(checkPassword)
    if(checkPassword){ 
        return done(null,data)
    }else{
        console.log('APP.JS  WRONG PASSWORD')
        return done(null,false)
    }
}))


app.use("/", require("./routes/homepage")); //route for web front end files
app.use("/admin", require("./routes/adminpage")); //route for admin files


app.use((req,res,next) => {
    res.status(404).render(`home/404`);//this needs to be last
})




app.listen(app.get("port"), function(){
    console.log("Listening for requests on port " + app.get("port"));
})