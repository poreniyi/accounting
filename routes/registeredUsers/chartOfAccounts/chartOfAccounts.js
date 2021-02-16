let express = require('express');
let router = express.Router();
let sampleData=[{
    accountName:'Cash',//a
    Number:2,   //b
    description:5,  //c
    normalSide:'No clue',//dd
    category:'Asset',   //e
    subCategory:'Asset',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:3,//m
    statement:64612,//n
    comment:'Acomment'//1
},{
    accountName:'Stocks',//a
    Number:52,   //b
    description:5,  //c
    normalSide:'No clue',//dd
    category:'Asset',   //e
    subCategory:'Asset',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:514,//m
    statement:64612,//n
    comment:'Acomment'//1
},{
    accountName:'Buildings',//a
    Number:2,   //b
    description:5,  //c
    normalSide:'No clue',//dd
    category:'Asset',   //e
    subCategory:'Asset',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:5184,//m
    statement:64612,//n
    comment:'Acomment'//1
},{
    accountName:'String',//a
    Number:2,   //b
    description:5,  //c
    normalSide:'No clue',//dd
    category:'Asset',   //e
    subCategory:'Asset',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:5184,//m
    statement:64612,//n
    comment:'Acomment'//1
},
    ]







router.get('/viewChart',(req,res) => {
     /*Sprint2 DBFunction 1
    returns an array of every single Account with every field 
    */
    res.locals.data=sampleData;
    res.render('charts/chart')
})
router.get('/addAccount',(req,res)=>{
    /*Sprint2 DBFunction 2
    returns an array of used account numbers
    assign this array to res.locals.takenNumbers
    */
   /*Sprint2 DBFunction 3
      returns an array of used order numbers
    assign this array to res.locals.orderNumbers
   */
    res.render('charts/addChart');
})

router.post('/addAccount',(req,res) => {
    res.send(req.body);
    
})
module.exports = router;
