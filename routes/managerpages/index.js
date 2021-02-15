let express = require('express');
let router = express.Router();
 



router.use("/", require("../dashboard"));
//router.use("/", require("../chartOfAccounts/view/"));


module.exports = router;
