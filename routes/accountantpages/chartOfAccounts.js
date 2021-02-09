let express = require('express');
let router = express.Router();
 


router.get('/chart',(req,res)=>{
    res.send('chart of accounts');
});




module.exports = router;
