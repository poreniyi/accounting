let express = require('express');
let router = express.Router();
let sampleData=[{
    accountName:'Cash',//a
    Number:1001,   //b
    description:'Checking account balance',  //c
    normalSide:'Debit',//dd
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
    accountName:'Wages Payable',//a
    Number:2100,   //b
    description:'Amount owned to employees',  //c
    normalSide:'Credit',//dd
    category:'Liability',   //e
    subCategory:'Payable',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:6131,//i
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
    comment:'Depcrciation'//1
},{
    accountName:'Mary Smith Capital',//a
    Number:2900,   //b
    description:'Amount invested in the company',  //c
    normalSide:'Credit',//dd
    category:'Equity',   //e
    subCategory:'Capital',   //f
    initialBalance:0,//g
    debit:5540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:5184,//m
    statement:6,//n
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
router.get('/editAccount/:number', (req,res) => {
    console.log(req.params.number);
    /* Sprint 2DB function 4
    A query on req.params.number that returns every field that we will allow the admin to edit
    and returns this into variable account
    if not found return null
    */
    let account=false;
    if(account){
        res.send(`You requested to edit Account ${req.params.number}`)
        //no edit page yet
    }else{
        res.render(`home/404`)
    }
})
router.put('/editAccount/:number', (req,res) => {
     /* Sprint 2DB function 5
    A query that updates the account found in req.params.number
    fields to be edited will be found in req.body
    */
    res.send(`You edited the account`);
})
router.post('/addAccount',(req,res) => {
    res.send(req.body);    
})

router.get('/sampleEdit',(req,res) => {
    res.locals.data=sampleData[1];
    res.render('charts/editChart');
})
module.exports = router;
