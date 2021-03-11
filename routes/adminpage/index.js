let express = require('express');
let router = express.Router();
 
let isAdmin=(req,res,next)=>{
    if(req.session.userType == undefined){
        res.status(403).render(`home/denied`);
    }
    else if (req.session.userType.toLowerCase()=='admin'){
        next();
    }
    else{
        res.status(403).render(`home/denied`);
    }
}
router.use(isAdmin);

router.use("/", require("./userreports"));
router.use("/", require("../registeredUsers"));



module.exports = router;
