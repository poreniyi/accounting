let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');
let journal = require('../../../database/Journal');
const Pusher = require("pusher");
let path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../..env')});

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

    req.session.Confirm={
        Previous:`${req.baseUrl}/journal`,
        message:"Transaction has been sent and is pending approval",
        data: ID,
        ViewResult:`${req.baseUrl}/journal`,
    }
    res.redirect(`${req.baseUrl}/confirmRedirect`);
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
    let initialBalance = await ledgerSearch.findLedgerInitialBalance(req.params.name)
    res.render('transactions/ledger', {data,Name:req.params.name, initialBalance});
})

router.post('/viewTransaction/Approve/:id',(req,res)=>{
    ledgerSearch.addTransactionToLedger(req.user, req.params.id, '', 'Approved')

    req.session.Confirm={
        Previous:`${req.baseUrl}/journal`,
        message:"Transaction has been approved",
        data:req.params.id,
        ViewResult:`${req.baseUrl}/viewTransaction/${req.params.id}`,
    }

    const pusher = new Pusher({
      appId: process.env.pusher_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true
    });
    
    pusher.trigger("my-channel", "my-event", {
      message: "New transaction"
    });
    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

router.post('/viewTransaction/Reject/:id',async (req,res)=>{
    ledgerSearch.addTransactionToLedger(req.user, req.params.id, req.body.comment, 'Rejected');
    req.session.Confirm={
        Previous:`${req.baseUrl}/journal`,
        message:"Transaction has been rejected",
        data:req.params.id,
        ViewResult:`${req.baseUrl}/viewTransaction/${req.params.id}`,
    }
    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

router.get('/pushTest',(req,res)=>{
    const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.pusher_id,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "New transaction"/// transaction id:link to transaction;
});
res.render('dashboard/dashboard.ejs');
})

module.exports = router;
