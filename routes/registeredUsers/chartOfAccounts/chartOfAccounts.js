let express = require('express');
let router = express.Router();

router.get('/viewChart',(req,res) => {
    res.render('charts/chart')
})
router.get('/addAccount',(req,res)=>{
    /*Sprint2 DBFunction 1
    returns an array of used account numbers
    assign this array to res.locals.takenNumbers
    */
    res.render('charts/addChart');
})

router.post('addAccount',(req,res) => {

})
module.exports = router;
