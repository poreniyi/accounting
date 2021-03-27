let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('statementViews/accountStatements');
})

router.get('/trialBalance', (req, res) => {
    res.render('statementViews/trialBalance');
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