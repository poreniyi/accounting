let Users=require('../mongooseDB/models/userModels');
var passport = require("passport");
let passportLocal = require('passport-local');
let encryption=require('../encryption/passwordEncryption');

module.exports=(passport) => {
    passport.use(new passportLocal({
    },async (username,password,done)=>{
        let user= await Users.findOne({'username':username},'username Password _id');
            if(!user){
                console.log(`User not found`);
                return done(null,false);
            }
            let samePass= await encryption.decryptPassword(password,user.Password);
            console.log(user);
            // if(user.Password!=password){
            //     return done(null,false);
            // }
            console.log();
            if(samePass){
                return done(null,user);
            }
            return done(null,user);
    }))
}
passport.serializeUser((user, done) => {
    done(null,user._id);
})
passport.deserializeUser((id, done) => {
    Users.findOne({_id:id},(err,user)=>{
        done(err,user._id);
    })
})