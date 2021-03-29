let router = require('express').Router()
let getAccountNames = require('../../../database/SearchAccount').getAccountNames;
let fs = require('fs').promises

router.get('/createSampleJournal', async (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    let accountNames = await getAccountNames('active accounts');
    res.render('transactions/addSampleJournal', { accountNames });
})
router.post('/createSampleJournal', async (req, res) => {
    if (req.session.userType.toLowerCase() == 'admin') {
        res.status(403).render(`home/denied`);
        return;
    }
    console.log(req.body);
    let data = [];
    let transaction={}
    let Account;
    let oldData=await fs.readFile('./sample1.json')
    oldData= JSON.parse(oldData);
    for (var i = 0; i < req.body.Account.length; i++) {
        Account = {
            user: req.user,
            Description: req.body.Description,
            Name: req.body.Account[i],
            Debits: req.body.Debits[i],
            Credits: req.body.Credits[i],
        }
        data.push(Account);
    }
    transaction.transaction=data;
    console.log(transaction)
    
    //req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID
      res.redirect(`${req.baseUrl}/createSampleJournal`);
})

module.exports = router;