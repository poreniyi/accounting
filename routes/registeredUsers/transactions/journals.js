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

module.exports = router;