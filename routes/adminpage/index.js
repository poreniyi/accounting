let express = require('express');
let router = express.Router();
 
let isLoggedIn=require('../homepage/authentication').isLoggedIn;

let isAdmin=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='admin'){
        next();
    }else{
        res.status(403).render(`home/denied`);
    }
}
router.use(isLoggedIn);
router.use(isAdmin);

router.use("/", require("./userreports"));
router.use("/", require("./dashboard"));
router.use('/',require('../chartOfAccounts/admin'));



module.exports = router;
