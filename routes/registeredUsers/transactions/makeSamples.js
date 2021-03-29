let router=require('express').Router()
let getAccountNames = require('../../../database/SearchAccount').getAccountNames;


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
//req.user, req.body.Account[i], req.body.Description, req.body.Debits[i], req.body.Credits[i], ID
    res.redirect(`${req.baseUrl}/confirmRedirect`);
})

module.exports=router;