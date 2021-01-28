//Entry point for app
var express = require("express");
var path = require("path");
var passport = require("passport");
let passportLocal = require('passport-local');
let session = require("express-session");
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
const user={
    id:'id',
    email:'mancara',
    password:'password',
}

passport.serializeUser((user, done) => {
    console.log(`Serializing user`);
    done(null,user.id);
})


passport.deserializeUser((id, done) => {
    console.log(`Deserialzing user`);
    const _user= user.id === id ? user : false;
    if(user.id==id){
        found= user;
    }else{
        console.log(`else in deserialize`);
    }
    done(null,_user);
})
passport.use(new passportLocal({
},(username,password,done)=>{
    if(username===user.email && password===user.password){
        return done(null,user)
    }else{
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