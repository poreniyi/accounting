var passport = require("passport");
let passportLocal = require('passport-local');
let encryption=require('../encryption/passwordEncryption');
let login = require("../database/Login");



module.exports=(passport) => {
    passport.use(new passportLocal({
    },async (username,password,done)=>{
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
}
passport.serializeUser((data, done) => {
    done(null,data[0]); // data[0] = username
})


passport.deserializeUser( async (username, done) => {

    let DBUsername = await login.findUser(username)
    if(DBUsername == username){
        done(null,username);
    }
   
})
