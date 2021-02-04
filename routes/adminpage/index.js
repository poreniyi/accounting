let express = require('express');
let router = express.Router();
 



router.use("/", require("./userreports"));
router.use("/", require("./dashboard"));


module.exports = router;
