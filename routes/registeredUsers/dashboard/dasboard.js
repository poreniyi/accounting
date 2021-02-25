let express = require('express');
let router = express.Router();
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.render('dashboard/dashboard.ejs');
});

router.get('/sucess',(req,res)=>{
    res.redirect('confirmation');
});


router.get('/confirmation',(req,res)=>{
    let data=req.session.confirmationData;
    let message=req.session.confirmationMessage;
    let back=req.session.Previous || `../../${req.session.userType.toLowerCase()}/dashboard`;
    delete req.session.Previous;
    delete req.session.confirmationData;
    delete req.session.confirmationMessage;
    res.status(200).render('dashboard/confirmation.ejs',{
        data:data,
        message:message,
        back:back,
    });
});





module.exports = router;
