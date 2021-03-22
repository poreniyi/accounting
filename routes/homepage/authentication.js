var express = require("express");
const passport= require('passport');
const lastLog = require('../../database/UserReport');

var router = express.Router();


let isLoggedIn=(req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/login');//change to login
    }
}

let isActivated=(req,res,next) =>{
    if(req.session.status){
        return next(); 
    }else{
        res.send(`Your account is deactivated`);
    }
}

router.get("/login",function (req,res){
    if (req.isAuthenticated()){
        res.redirect('/');
    }
     res.render("home/login");
});

router.get('/succesfulLogin',(req,res)=>{
    res.redirect(`${req.session.userType.toLowerCase()}/home`)
})

router.get("/logout", async function (req,res) {
    lastLog.addLastLogin(req.user);
    req.logout();
    req.session.destroy();
    res.redirect("/home");
});

// router.post('/login',
//   passport.authenticate('local', { 
//       successRedirect: '/secret',
//         failureRedirect: '/login' })
// );

router.get('/wrongCredentials', async (req,res)=>{
    res.locals.message='Wrong username or password';
    res.render('home/login');
})
router.post('/login', async (req,res,next)=>{
   passport.authenticate('local',(err,user) => {
    if(err){
        return next (err)
    }
    if(!user){
        res.redirect('/wrongCredentials');
    }
    req.login(user, async () =>{
        req.session.lastLogin = await lastLog.getLastLogin(user[0]);
        req.session.userType=user[2];
        req.session.status= user[3];
        res.redirect('/succesfulLogin');
    })
   })(req,res,next)
})

module.exports={
    router:router,
    isLoggedIn:isLoggedIn,
    isActivated:isActivated,
};
