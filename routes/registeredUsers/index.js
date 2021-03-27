let express = require('express');
let router = express.Router();

let isActivated = require('../homepage/authentication').isActivated;
let isLoggedIn=require('../homepage/authentication').isLoggedIn;

router.use(isActivated);
router.use(isLoggedIn);


router.use("/", require("./dashboard/dasboard"));
router.use("/",require('./chartOfAccounts'));
router.use("/",require('./transactions'));
router.use("/",require('./finanicalReports'));



module.exports = router;
