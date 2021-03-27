let express = require('express');
let router = express.Router();
let statements = require('../../../database/Statements')

router.get('/', (req, res) => {
    res.render('statementViews/accountStatements');
})

router.get('/trialBalance', async (req,res)=>{
  let data = await statements.generateTrialBalance()
  res.render('statementViews/trialBalance', data);
})
router.get('/balanceSheet', (req, res) => {
    res.render('statementViews/balanceSheet');
})
router.get('/retainedEarnings', (req, res) => {
    res.render('statementViews/retainedEarnings');
})
router.get('/IncomeStatement', (req, res) => {
    res.render('statementViews/incomeStatement');
})

module.exports = router;