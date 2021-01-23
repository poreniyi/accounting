let express = require('express');
let router = express.Router();
 



router.use("/", require("./userreports"));


module.exports = router;
