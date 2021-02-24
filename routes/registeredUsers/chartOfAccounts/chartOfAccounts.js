let express = require('express');
let search = require("../../../database/SearchAccount");
let create = require("../../../database/CreateAccount");
let edit = require("../../../database/EditAccount");
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
    
    let data = await search.searchByNumber(req.params.number)

    if(data){
        res.render('charts/editChart', data[0]);
    }else{
        res.render(`home/404`)
    }
})
router.put('/editAccount/:number', async (req,res) => {

    console.log(req)
    
    let result = await edit.editAccount(req.body, req.user)

    


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
