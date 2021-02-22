var express = require("express");
const passport= require('passport');

var router = express.Router();


let isLoggedIn=(req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/login');//change to login
    }
}

let isActivated=((req,res,next) =>{
    console.log(req.session.status);
    if(req.session.status){
        return (next);
    }else{
        res.send(`Your account is deactivated`);
    }
})

router.get("/login",function (req,res){
    if (req.isAuthenticated()){
        res.redirect('/');
    }
     res.render("home/login");
});

router.get('/succesfulLogin',(req,res)=>{
    if(req.session.userType.toLowerCase()=='admin'){
        res.redirect('/admin/home');
    }else if(req.session.userType.toLowerCase()=='accountant'){
        res.redirect('/accountant/home');
    }else{//manager
        res.redirect('/manager/home');
    }
})

router.get("/logout", function (req,res){
    req.logout();
    req.session.destroy();
    res.redirect("/home");
});

// router.post('/login',
//   passport.authenticate('local', { 
//       successRedirect: '/secret',
//         failureRedirect: '/login' })
// );

router.get('/wrongCredentials',(req,res)=>{
    res.locals.message='Wrong username or password';
    res.render('home/login');
})
router.post('/login',(req,res,next)=>{
   passport.authenticate('local',(err,user) => {
    if(err){
        return next (err)
    }
    if(!user){
        res.redirect('/wrongCredentials');
    }
    req.login(user, () =>{
        req.session.userType=user[2];
        res.redirect('/succesfulLogin');
    })
   })(req,res,next)
})

module.exports={
    router:router,
    isLoggedIn:isLoggedIn,
    isActivated:isActivated,
};
