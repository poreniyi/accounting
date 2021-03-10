let express = require('express');
let router = express.Router();

let isAdmin=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='admin'){
        next();
    }else{
        res.status(403).render(`home/denied`);
    }
}

router.use('/', require('./chartOfAccounts'));



module.exports= router;