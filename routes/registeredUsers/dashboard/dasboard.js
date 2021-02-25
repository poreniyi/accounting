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
    res.status(200).render('dashboard/confirmation.ejs',{
        data:req.session.confirmationData,
        message:req.session.confirmationMessage
    });
});





module.exports = router;
