let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');
let journal = require('../../../database/Journal');

router.get('/journal', async (req, res) => {
    console.log(req.user);
    let data = await journal.getJournalTransactions()
    res.render('transactions/journal', data)
})
router.get('/createJournal', async(req, res) => {
    let accountNames=await getAccountNames();
    res.render('transactions/addJournal',{accountNames});
})
router.post('/createJournal', async (req, res) => {

    let ID = await journal.getTransactionID();

    for(var i = 0; i < req.body.Account.length; i++){
            journal.createTransaction(req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID)
    }
    res.send('Transaction has been sent and is pending approval');
})

router.get('/viewtransaction/:id',async (req,res)=>{
    let data = await journal.getTransactionsByID(req.params.id)
    res.render('transactions/viewTransaction', data);
})

router.get('/ledger/viewtransaction/:id',async (req,res)=>{
    let data = await journal.getTransactionsByID(req.params.id)
    res.render('transactions/viewTransaction', data);
})

router.get('/ledger/:name',async (req,res)=>{
    let data = await ledgerSearch.findLedger(req.params.name)
    res.render('transactions/ledger', data);
})

router.post('/viewTransaction/Approve/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("approved");
})

router.post('/viewTransaction/Reject/:id',(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    res.send(req.body);
})


module.exports = router;