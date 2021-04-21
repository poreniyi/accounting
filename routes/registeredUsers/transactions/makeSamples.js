let router = require('express').Router()
let getAccountNames = require('../../../database/SearchAccount').getAccountNames;
let fs = require('fs').promises
let path = require('path');
let journal = require('../../../database/Journal')
let ledgerSearch = require('../../../database/Ledger');

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
    let date = req.body.Date || new Date();
    let data = [];
    let Account;
    for (var i = 0; i < req.body.Account.length; i++) {
        Account = {
            user: req.user,
            Description: req.body.Description,
            Name: req.body.Account[i],
            Debits: req.body.Debits[i],
            Credits: req.body.Credits[i],
            Date: date,
        }
        data.push(Account);
    }
    const collection = req.app.locals.db.collection('Sample3');
    let obj = { Accounts: data }
    collection.insertOne(obj)
    //req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID
    res.redirect(`${req.baseUrl}/createSampleJournal`);
})

router.get('/json', async (req, res) => {
    // let oldData=await fs.readFile(path.join(__dirname,'samples','sample1.json'))
    const collection = req.app.locals.db.collection('Sample1');
    const collection2 = req.app.locals.db.collection('Sample2');
    let data = await collection.find({}).project({ _id: 0 }).toArray();
    let data2= await collection2.find({}).project({_id:0}).toArray();
    jsonData=data.concat(data2)
    res.send(jsonData);
})

router.get('/addTransactions', async (req, res) => {
    let counter = 0;
    for (let i = 1; i < 3; i++) {
        const collection = req.app.locals.db.collection(`Sample${i}`)
        let data = await collection.find({}).toArray();
        for (let j = 0; j < data.length; j++) {
            let ID = await journal.getTransactionID();
            counter++;
            for (let k = 0; k < data[j].Accounts.length; k++) {
                let element = data[j].Accounts[k];
                let d = new Date()
                let date;
                date = element.Date + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                await journal.createTransaction(element.user, element.Name, element.Description, element.Debits,
                    element.Credits, ID, date)
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
           await ledgerSearch.addTransactionToLedger('aacb022021', ID, '', 'Approved')   
           if(counter == 7){
            res.send(`There are:${counter}`)
            return;
            }
        } 
    }
    
})

// router.get('/jsonUpload', async (req, res) => {
//     let oldData = await fs.readFile(path.join(__dirname, 'samples', 'sample1.json'))
//     oldData = JSON.parse(oldData);
//     console.log(oldData.transactions.length)
//     const collection = req.app.locals.db.collection('Sample1');
//     let data = await collection.insertMany(oldData.transactions)
//     res.send(data);
// })
module.exports = router;