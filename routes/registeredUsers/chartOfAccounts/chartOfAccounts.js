let express = require('express');
let router = express.Router();

router.get('/viewChart',(req,res) => {
    res.render('charts/chart')
})
router.get('/getChart',(req,res)=>{
    let data=[{Name:'Account1',Credit:5000},{Name:'Account1',Credit:2000},{Name:'Account1',Credit:9000}]
    res.send(data);
})
router.get('/charts',(req,res) =>{
    res.render('charts/adminChart');
})
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
