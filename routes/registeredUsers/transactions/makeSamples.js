let router = require('express').Router()
let getAccountNames = require('../../../database/SearchAccount').getAccountNames;
let fs = require('fs').promises
let path=require('path');

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
    let date=req.body.Date||new Date();
    let data = [];
    let Account;
    let oldData=await fs.readFile(path.join(__dirname,'samples','sample1.json'))
    oldData= JSON.parse(oldData);
    console.log(oldData);
    for (var i = 0; i < req.body.Account.length; i++) {
        Account = {
            user: req.user,
            Description: req.body.Description,
            Name: req.body.Account[i],
            Debits: req.body.Debits[i],
            Credits: req.body.Credits[i],
            Date:date,
        }
        data.push(Account);
    }
    let obj={Accounts:data}
   oldData.transactions.push(obj);
    let writeData=JSON.stringify(oldData,null,2)
    fs.writeFile(path.join(__dirname,'samples','sample1.json'),writeData)
    //req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID
      res.redirect(`${req.baseUrl}/createSampleJournal`);
})

router.get('/json',async(req,res)=>{
    let oldData=await fs.readFile(path.join(__dirname,'samples','sample1.json'))
    oldData= JSON.parse(oldData);
    console.log(oldData.transactions.length)
    res.send(oldData);
})
module.exports = router;