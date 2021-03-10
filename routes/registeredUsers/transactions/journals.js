let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');
let journal = require('../../../database/Journal');

router.get('/journal', async (req, res) => {
    let data = await journal.getJournalTransactions();
    let items=data.TextRow;
    for(let i=0;i<items.length;i++){
        if(!items[i].DATE){
           items[i-1].ACCOUNT+=`+${items[i].ACCOUNT}`;
           items.splice(i,1);
            i--;
        }
    }
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
    let data = await journal.getTransactionsByID(req.params.id);
     let amount=0;
     for(let i=0;i<data.TextRow.length;i++){
         amount+=data.TextRow[i].DEBIT;
     }
    res.render('transactions/viewTransaction', {data,amount});
})

router.get('/ledger/:name',async (req,res)=>{
    let data = await ledgerSearch.findLedger(req.params.name)
    res.render('transactions/ledger', {data,Name:req.params.name});
})

router.post('/viewTransaction/Approve/:id',(req,res)=>{
    ledgerSearch.addTransactionToLedger(req.params.id, '', 'Approved')
    res.send("approved");
})

router.post('/viewTransaction/Reject/:id',(req,res)=>{
    ledgerSearch.addTransactionToLedger(req.params.id, req.body.comment, 'Rejected')
    res.send("Rejected");
})


module.exports = router;