let express = require('express');
let router = express.Router();
let transactions = require('../../../database/Journal');
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.render('dashboard/dashboard.ejs');
});

router.get('/notifications', async (req,res)=>{
    let data = await transactions.getTransactionsFromLastLogin(req.session.lastLogin)
    if(req.session.userType!="Manager"){
        redirect('dashboard');
    }
    else
<<<<<<< HEAD
    {
    let items=data.TextRow;
    for(let i=0;i<items.length;i++){
        if(!items[i].DATE){
           items[i-1].ACCOUNT+=`+${items[i].ACCOUNT}`;
           items.splice(i,1);
            i--;
        }
    }
    console.log(data);
=======
>>>>>>> bb634d858712d8e45789aea6aea1ccf6b6e35bab
    res.render('dashboard/notifications', data);
    }
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
    req.session.Confirm.ViewResult=  req.session.Confirm.ViewResult ||  ``;

    let data=req.session.Confirm;
    delete req.session.Confirm;
    res.status(200).render('dashboard/confirmation.ejs',{data});
});





module.exports = router;
