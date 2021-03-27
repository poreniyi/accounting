let express = require('express');
let router = express.Router();

router.get('/trialBalance', (req,res)=>{
    res.render('/statements/trialBalance');
})

module.exports = router;