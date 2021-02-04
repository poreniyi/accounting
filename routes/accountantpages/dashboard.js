let express = require('express');
let router = express.Router();
 

router.get('/home',(req,res)=>{
    res.redirect('./dashboard');
});

router.get('/dashboard',(req,res)=>{
    res.send('Accountant logged in nothing to see ATM');
});




module.exports = router;
