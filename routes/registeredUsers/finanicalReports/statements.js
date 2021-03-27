let express = require('express');
let router = express.Router();
let statements = require('../../../database/Statements')

router.get('/statements',(req,res)=>{
  //  res.send('hi');
    res.render('statementViews/accountStatements');
})

router.get('/trialBalance', async (req,res)=>{
  let data = await statements.generateTrialBalance()
  res.render('statementViews/trialBalance', data);
})

module.exports = router;