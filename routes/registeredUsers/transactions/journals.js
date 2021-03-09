let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;

router.get('/journal', (req, res) => {
    res.render('transactions/journal')
})
router.get('/createJournal', async(req, res) => {
    let accountNames=await getAccountNames();
    res.render('transactions/addJournal',{accountNames});
})
router.post('/createJournal', (req, res) => {
    //res.render('');
    res.send(req.body);
})

let data =
{
    "date": "01/01/2001",
    "PR": "PR",
    "Debit": 2000,
    "Credit": 3000,
    "Balance": "Total",
    "Description": "sample text"

}

router.get('/ledger', (req, res) => {
    res.render('transactions/ledger', data)
})

// router.get('/ledger/:name',async (req,res)=>{
    // let data = await search.(ledgerQueryFunction)(req.params.name)
    // res.render('transactions/ledger', data);
// })
//Function to get ledger based on name is still needed for this route

module.exports = router;