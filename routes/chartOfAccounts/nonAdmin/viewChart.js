let express = require('express');
let router = express.Router();

router.get('/viewChart',(req,res) => {
    res.render('charts/chart')
})
router.get('/getChart',(req,res)=>{
    let data=[{Name:'Account1',Credit:5000},{Name:'Account1',Credit:2000},{Name:'Account1',Credit:9000}]
    res.send(data);
})

module.exports = router;
