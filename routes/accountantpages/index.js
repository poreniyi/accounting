let express = require('express');
let router = express.Router();
 



 router.use("/", require("../registeredUsers"));
 



module.exports = router;
