let express = require('express');
let router = express.Router();
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.render('dashboard/dashboard.ejs');
});

router.get('/notifications', (req,res)=>{
    if(req.session.userType!="Manager"){
        redirect('dashboard');
    }
    res.render('dashboard/notifications');
})

router.get('/confirmRedirect',(req,res)=>{
    res.redirect('confirmation');
});


router.get('/confirmation',(req,res)=>{
    console.log(req.session.Confirm);
    req.session.Confirm=req.session.Confirm || {}
    req.session.Confirm.Previous=  req.session.Confirm.Previous ||  `../../${req.session.userType.toLowerCase()}/dashboard`;
    req.session.Confirm.message=  req.session.Confirm.message ||  ``;
    req.session.Confirm.data=  req.session.Confirm.data ||  ``;
    let data=req.session.Confirm;
    delete req.session.Confirm;
    res.status(200).render('dashboard/confirmation.ejs',{data});
});





module.exports = router;
