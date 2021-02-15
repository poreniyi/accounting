let express = require('express');
let router = express.Router();
 

router.use("/", require("./dashboard/dasboard"));
router.use("/",require('./chartOfAccounts'));



module.exports = router;
