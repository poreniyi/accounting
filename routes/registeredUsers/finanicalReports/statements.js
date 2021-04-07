let express = require('express');
let router = express.Router();
let statements = require('../../../database/Statements')

router.get('/', (req, res) => {
    res.render('statementViews/accountStatements');
})

router.post('/',(req,res)=>{
    req.session.statement={
        start:req.body.startDate,
        end:req.body.endDate,
    }
    res.redirect(`${req.originalUrl}/${req.body.Statement}`)
})
router.get('/trialBalance', async (req, res) => {
   let data=await statements.generateTrialBalance()
    try {
        res.render('statementViews/trialBalance', data);
    } catch (error) {
        res.render(`statementViews/emptyStatement`);
    }
    
})
router.get('/balanceSheet', async (req, res) => {
    const reducer = (accumulator, currentValue) => {
        let value;
        if (typeof currentValue.BALANCE == 'string') {
            value = currentValue.BALANCE.replace(/\W+/g,'');
            value=-Number(value);
        }else value=currentValue.BALANCE
        return accumulator += value;
    }
    //let data =await statements.generateBalanceSheet(re)
    let data = await statements.generateBalanceSheet()
    let totals = {
        asset:data.asset.TextRow.reduce(reducer, 0),
        liability:data.liability.TextRow.reduce(reducer, 0),
        equity:data.equity.TextRow.reduce(reducer, 0)
    }
    res.render('statementViews/balanceSheet', {data,totals});
})
router.get('/retainedEarnings', (req, res) => {
    res.render('statementViews/retainedEarnings');
})
router.get('/IncomeStatement', (req, res) => {
    res.render('statementViews/incomeStatement');
})

module.exports = router;