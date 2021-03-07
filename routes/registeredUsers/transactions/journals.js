let express = require('express');
let router = express.Router();

router.get('/journal', (req,res) => {
    res.render('transactions/journal')
})

module.exports = router;