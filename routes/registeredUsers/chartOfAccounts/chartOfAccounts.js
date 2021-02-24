let express = require('express');
let search = require("../../../database/SearchAccount");
let create = require("../../../database/CreateAccount");
let router = express.Router();

router.get('/viewChart', async (req,res) => {
     
    let data = await search.getAllAccounts()

    res.render('charts/chart', data)
})
router.get('/addAccount',(req,res)=>{
    
   /*Sprint2 DBFunction 3
      returns an array of used order numbers
    assign this array to res.locals.orderNumbers
   */
    res.render('charts/addChart');
})
router.get('/editAccount/:number', async (req,res) => {
    
    console.log(req.params.number);
    
    let data = await report.searchByNumber(req.params.number)
    let account=false;
    if(account){
        res.send(`You requested to edit Account ${req.params.number}`)
        //no edit page yet
    }else{
        res.render(`home/404`)
    }
})
router.put('/editAccount/:number', (req,res) => {

    console.log(req)
     /* Sprint 2DB function 5
    A query that updates the account found in req.params.number
    fields to be edited will be found in req.body
    */


    res.send(`You edited the account`);
})
router.post('/addAccount', async (req,res) => {

    let result = await create.createAccount(req.body, req.user);
    
    if(result){
        res.send("Success")
    }
    else{
        res.send("Unsuccesful")
    }
 
})

router.get('/sampleEdit',(req,res) => {
    res.locals.data=sampleData[1];
    res.render('charts/editChart');
})
module.exports = router;
