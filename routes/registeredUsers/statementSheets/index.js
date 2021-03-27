let express = require('express');
let router = express.Router();


router.use('/', require('./statements'));


module.exports= router;