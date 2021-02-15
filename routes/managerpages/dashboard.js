let express = require('express');
let router = express.Router();
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.locals.isDashboard=true;
    res.render('dashboard/dashboard.ejs');
});




module.exports = router;
