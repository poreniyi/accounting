let express = require('express');
let router = express.Router();
 
let isManager=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='manager'){
        next();
    }else{
        res.status(403).render(`home/denied`);
    }
}
router.use(isManager);


router.use("/", require("../registeredUsers"));
//router.use("/", require("../chartOfAccounts/view/"));


module.exports = router;
