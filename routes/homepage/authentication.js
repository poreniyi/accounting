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

let isDeactivated=((req,res,next) =>{
    if(true){
        return (next);
    }else{
        res.send(`Your account is deactivated`);
    }
})
router.get("/login",function (req,res){
     res.render("home/login");
});
router.get('/test',isLoggedIn,(req,res)=>{
    res.send("YOU");
    console.log(req.session.message);
})
router.get('/sessionTest',(req,res)=>{
    if(req.session.testSession){
        req.session.testSession='visited'
    }
    else {
        req.session.testSession='new';
    }
    res.send(req.session.testSession);
})
router.get('/secret',(req,res)=>{
    console.log(`Secret page:The user is ${req.user}`);
    console.log(`The amount of views is${req.session.views}`);
    req.session.views++;
    if(req.isAuthenticated()) {
        res.send('YOu can see this page');
    } else {
        return res.send('ACESS DENIED');//change to login
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

router.post('/login',(req,res,next)=>{
   passport.authenticate('local',(err,user) => {
    if(err){
        return next (err)
    }
    if(!user){
        return res.send('Wrong email or password');
    }
    req.login(user, () =>{
        req.session.views=123;
            res.redirect('/secret');
            //set user type here on req.session.x
            console.log(req.user);
    })
   })(req,res,next)
})

module.exports={
    router:router,
    isLoggedIn:isLoggedIn,
};
