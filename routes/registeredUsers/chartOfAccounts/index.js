let express = require('express');
let router = express.Router();
router.use('/', require('./chartOfAccounts'));

let isAdmin=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='admin'){
        next();
    }else{
        res.status(403).render(`home/denied`);
    }
}
router.use(isAdmin);


module.exports= router;