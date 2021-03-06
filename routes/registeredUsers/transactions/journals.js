let express = require('express');
let router = express.Router();
let getAccountNames = require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');
let journal = require('../../../database/Journal');
const Pusher = require("pusher");
let path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../..env') });

router.get('/journal', async (req, res) => {
    let data = await journal.getJournalTransactions();
    let items = data.TextRow;
    for (let i = 0; i < items.length; i++) {
        if (items[i].CREDIT > 0) {
            items[i].ACCOUNT = `\t${items[i].ACCOUNT}`
        }
        if (!items[i].DATE) {
            items[i - 1].ACCOUNT += `+${items[i].ACCOUNT}`
            items[i - 1].AMOUNT += items[i].AMOUNT
            items.splice(i, 1);
            i--;
        }
    }
    res.render('transactions/journal', data)
})
router.get('/createJournal', async (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    let accountNames = await getAccountNames('active accounts');
    res.render('transactions/addJournal', { accountNames });
})
router.post('/createJournal', async (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    let ID = await journal.getTransactionID();

    let d = new Date()
    let date;

    if(req.body.Date){
        date = req.body.Date + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }

    for (var i = 0; i < req.body.Account.length; i++) {
        journal.createTransaction(req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID, date)
    }

    req.session.Confirm = {
        Previous: `${req.baseUrl}/journal`,
        message: "Transaction has been sent and is pending approval",
        data: ID,
        ViewResult: `${req.baseUrl}/viewTransaction/${ID}`,
    }
    const pusher = new Pusher({
        appId: process.env.pusher_id,
        key: process.env.pusher_key,
        secret: process.env.pusher_secret,
        cluster: process.env.pusher_cluster,
        useTLS: true
    });

    pusher.trigger("my-channel", "my-event", {
        message: "New transaction",/// transaction id:link to transaction;
        ID: ID,
    });

    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

router.get('/viewtransaction/:id', async (req, res) => {
    let data = await journal.getTransactionsByID(req.params.id);
    let amount = 0;
    for (let i = 0; i < data.TextRow.length; i++) {
        amount += data.TextRow[i].DEBIT;
    }
    res.render('transactions/viewTransaction', { data, amount });
})

router.get('/ledger/:name', async (req, res) => {
    let data = await ledgerSearch.findLedger(req.params.name)
    let initialBalance = await ledgerSearch.findLedgerInitialBalance(req.params.name)
    try {
        res.render('transactions/ledger', { data, Name: req.params.name, initialBalance, Normal: data.TextRow[0].NORMALSIDE });
    } catch (error) {
        res.render(`transactions/emptyLedger`);
    }
})

router.post('/viewTransaction/Approve/:id', (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    if (req.session.userType.toLowerCase() == 'accountant') {
        res.status(403).render(`home/denied`);
        return;
    }
    ledgerSearch.addTransactionToLedger(req.user, req.params.id, '', 'Approved')

    req.session.Confirm = {
        Previous: `${req.baseUrl}/journal`,
        message: "Transaction has been approved",
        data: req.params.id,
        ViewResult: `${req.baseUrl}/viewTransaction/${req.params.id}`,
    }
    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

router.post('/viewTransaction/Reject/:id', async (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    if (req.session.userType.toLowerCase() == 'accountant') {
        res.status(403).render(`home/denied`);
        return;
    }
    ledgerSearch.addTransactionToLedger(req.user, req.params.id, req.body.comment, 'Rejected');
    req.session.Confirm = {
        Previous: `${req.baseUrl}/journal`,
        message: "Transaction has been rejected",
        data: req.params.id,
        ViewResult: `${req.baseUrl}/viewTransaction/${req.params.id}`,
    }
    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

module.exports = router;
