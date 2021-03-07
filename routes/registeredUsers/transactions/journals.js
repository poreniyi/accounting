let express = require('express');
let router = express.Router();

router.get('/journal', (req, res) => {
    res.render('transactions/journal')
})
router.post('/journal', (req, res) => {
    //res.render('');
    res.send(req.body);
})

module.exports = router;