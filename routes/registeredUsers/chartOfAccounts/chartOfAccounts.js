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
   /*
      returns an array of used order numbers
    assign this array to res.locals.orderNumbers
   */
    res.render('charts/addChart');
})

router.post('/addAccount',(req,res) => {
    res.send(req.body);
    
})
module.exports = router;
