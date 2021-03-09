let express = require('express');
let router = express.Router();
let getAccountNames=require('../../../database/SearchAccount').getAccountNames;
let ledgerSearch = require('../../../database/Ledger');

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

router.get('/ledger/:name',async (req,res)=>{
    let data = await ledgerSearch.findLedger(req.params.name)
    res.render('transactions/ledger', data);
})

module.exports = router;