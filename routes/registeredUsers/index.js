let express = require('express');
let router = express.Router();
 

router.use("/", require("./dashboard/dasboard"));




module.exports = router;
