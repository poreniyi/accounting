let express = require('express');
let router = express.Router();

let isLoggedIn=require('../homepage/authentication').isLoggedIn;

router.use(isLoggedIn);


router.use("/", require("./dashboard/dasboard"));
router.use("/",require('./chartOfAccounts'));



module.exports = router;
