var express = require("express");

var router = express.Router();

//route the user to home from root("/") request
router.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.userType= req.session.userType;

    next();
});

//error and info handling not implemented yet

router.use("/", require("./home"));
router.use('/', require ('./authentication').router);


module.exports = router;