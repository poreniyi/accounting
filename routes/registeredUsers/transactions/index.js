let express = require('express');
let router = express.Router();


router.use('/', require('./journals'));


module.exports= router;