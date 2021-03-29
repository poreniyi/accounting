let express = require('express');
let router = express.Router();


router.use('/', require('./journals'));
router.use('/', require('./makeSamples'))


module.exports= router;