let express = require('express');
let router = express.Router();


router.use('/', require('./journals'));
router.use('/sample', require('./makeSamples'))


module.exports= router;