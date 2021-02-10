let express = require('express');
let router = express.Router();
 


router.get('/chart',(req,res)=>{
    res.locals.hi='Hello'
    res.render('charts/adminChart');
});


router.put('/edit',(req,res)=>{
    req.body.Credit+=5000;
    res.send(req.body);
})

router.post('/edit',(req,res)=>{
    let array=[  sampleJson={
        Name:"Account1",
        Debit: 500
    }]
    console.log(req.body);
  array.push(req.body);
    res.send(array)
})

router.put('/deactivate',(req,res) => {
    req.body.Status='Deactivated';
    res.send(req.body);
})

module.exports = router;
