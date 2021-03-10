let express = require('express');
let router = express.Router();
 
let isAccountant=(req,res,next)=>{
    if (req.session.userType.toLowerCase()=='accountant'){
        next();
    }else{
        res.status(403).render(`home/denied`);
    }
}
router.use(isAccountant);


 router.use("/", require("../registeredUsers"));
 



module.exports = router;
