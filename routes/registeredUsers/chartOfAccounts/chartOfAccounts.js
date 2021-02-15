let express = require('express');
let router = express.Router();

router.get('/viewChart',(req,res) => {
    res.render('charts/chart')
})
router.get('/addAccount',(req,res)=>{
    res.send('addddd accont');
})
module.exports = router;
