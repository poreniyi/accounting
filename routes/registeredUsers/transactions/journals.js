let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');
let journal = require('../../../database/Journal');

router.get('/journal', (req, res) => {
    res.render('transactions/journal')
})
router.get('/createJournal', async(req, res) => {
    let accountNames=await getAccountNames();
    res.render('transactions/addJournal',{accountNames});
})
router.post('/createJournal', async (req, res) => {

    let ID = await journal.getTransactionID()

    for(var i = 0; i < req.body.Account.length; i++){
            journal.createTransaction(req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID)
    }
    res.send('Transaction has been sent and is pending approval');
})

router.get('/ledger/:name',async (req,res)=>{
    let data = await ledgerSearch.findLedger(req.params.name)
    res.render('transactions/ledger', data);
})

module.exports = router;