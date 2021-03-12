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
    if (!req.session.userType.toLowerCase()=='admin'){
        res.status(403).render(`home/denied`);
    }
    res.render('charts/addChart');
})
router.get('/editAccount/:number', async (req,res) => {
    if (!req.session.userType.toLowerCase()=='admin'){
        res.status(403).render(`home/denied`);
    }
    let data = await search.searchByNumber(req.params.number)

    if(data){
        res.render('charts/editChart', data[0]);
    }else{
        res.status(`home/404`)
    }
})
router.post('/editAccount/:number',async (req,res) => {
    if (!req.session.userType.toLowerCase()=='admin'){
        res.status(403).render(`home/denied`);
    }
    let result = await edit.editAccount(req.body, req.user);
    req.session.Confirm={
        Previous:`${req.baseUrl}/viewChart`,
        ViewResult:`${req.baseUrl}/editAccount/${req.params.number}`,
    }
    req.session.Confirm.message= result ? result : 'Something went wrong';
    res.redirect(`${req.baseUrl}/confirmRedirect`);

})
router.post('/addAccount', async (req,res) => {
    if (!req.session.userType.toLowerCase()=='admin'){
        res.status(403).render(`home/denied`);
    }
    let result = await create.createAccount(req.body, req.user);
    req.session.Confirm={
        Previous:`${req.baseUrl}/viewChart`,
    }
    req.session.Confirm.message= result ? `Account added` : 'Something went wrong';
    res.redirect(`${req.baseUrl}/confirmRedirect`);
 
})

router.get('/eventLog/:name',async (req,res)=>{
     let data = await search.getEventLog(req.params.name)
     let Name = data.TextRow[0].NAME
     res.render('charts/eventLog', {data, name:req.params.name});
 })

module.exports = router;
