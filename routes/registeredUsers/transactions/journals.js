let express = require('express');
let router = express.Router();

router.get('/journal', (req, res) => {
    res.render('transactions/journal')
})
router.get('/createJournal', (req, res) => {
    res.render('transactions/addJournal');
})
router.post('/createJournal', (req, res) => {
    //res.render('');
    res.send(req.body);
})

router.get('/ledger', (req,res) => {

    res.render('transactions/ledger')
})

module.exports = router;