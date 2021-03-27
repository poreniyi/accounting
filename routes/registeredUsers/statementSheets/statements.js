let express = require('express');
let router = express.Router();

router.get('/trialBalance', (req,res)=>{
    res.render('statementViews/trialBalance');
})

module.exports = router;