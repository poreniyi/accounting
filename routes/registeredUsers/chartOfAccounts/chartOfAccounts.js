let express = require('express');
let search = require("../../../database/SearchAccount");
let create = require("../../../database/CreateAccount");
let edit = require("../../../database/EditAccount");
let validator = require('express-validator');
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
    
    let data = await search.searchByNumber(req.params.number)

    if(data){
        res.render('charts/editChart', data[0]);
    }else{
        res.status(`home/404`)
    }
})
router.post('/editAccount/:number',async (req,res) => {
    let result = await edit.editAccount(req.body, req.user);
    if(result){
        req.session.confirmationMessage=`Account edited succesfully`;
    }
    else{
        req.session.confirmationMessage=`Denied: that account has a balance greater than 0 so it can't be deactivated`;
    }

    req.session.Previous=`${req.baseUrl}/viewChart`;
    req.session.confirmationData=result;

    res.redirect(`${req.baseUrl}/sucess`);

})
router.post('/addAccount', async (req,res) => {

    let result = await create.createAccount(req.body, req.user);
    if(result){
        req.session.confirmationMessage=result;
        req.session.confirmationData=true;
        req.session.Previous=`${req.baseUrl}/viewChart`;

        res.redirect(`${req.baseUrl}/sucess`);
    }
    else{
        res.send(result)
    }
 
})

router.get('/eventLog/:name',async (req,res)=>{
     let data = await search.getEventLog(req.params.name)
     res.render('charts/eventLog', data);
 })

 router.get('/ledger', (req,res) => {

    res.render('charts/ledger')
})

module.exports = router;
