let express = require('express');
let router = express.Router();
 



 router.use("/", require("../registeredUsers"));
 router.use('/',require('../chartOfAccounts/nonAdmin'));

 //router.use("/", require("../chartOfAccounts/view"));



module.exports = router;
