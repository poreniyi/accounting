let express = require('express');
let router = express.Router();
router.use('/', require('../nonAdmin/viewChart'));


module.exports= router;