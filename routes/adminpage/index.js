let express = require('express');
let router = express.Router();
 
let isLoggedIn=require('../homepage/authentication').isLoggedIn;

let isAdmin=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='admin'){
        next();
    }else{
        res.status(403).render(`home/denied`);//this needs to be last
    }
}
router.use(isLoggedIn);
router.use(isAdmin);

router.use("/", require("./userreports"));
router.use("/", require("./dashboard"));


module.exports = router;
