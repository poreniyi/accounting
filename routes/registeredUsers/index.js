let express = require('express');
let router = express.Router();
let isActivated=require('../homepage/authentication').isActivated;

router.use(isActivated);
let isLoggedIn=require('../homepage/authentication').isLoggedIn;

router.use(isLoggedIn);


router.use("/", require("./dashboard/dasboard"));
router.use("/",require('./chartOfAccounts'));



module.exports = router;
