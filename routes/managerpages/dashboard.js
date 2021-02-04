let express = require('express');
let router = express.Router();
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.send('Manger logged in: nothing to see atm');
});




module.exports = router;
