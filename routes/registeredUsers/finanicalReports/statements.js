let express = require('express');
let router = express.Router();

router.get('/statements',(req,res)=>{
  //  res.send('hi');
    res.render('statementViews/accountStatements');
})

router.get('/trialBalance', (req,res)=>{
    res.render('statementViews/trialBalance');
})

module.exports = router;