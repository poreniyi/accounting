let express = require('express');
let report = require("../../database/UserReport.js");
let router = express.Router();
let updateUser = require("../../database/UpdateUser.js");
let insertUser = require("../../database/InsertUser");


router.get("/report", async function (req,res,next){

    let data = await report.getReport();

    res.render('userreports/allusers.ejs',data);
});

router.get('editUser',()=>{
    redirect('/edit');
})

router.get('/edit', async (req,res)=>{
    let data = await report.getUser(req.query.USERNAME)
    console.log(data)
    res.render('userreports/editpage', data.TextRow);
})

router.post('/edit', (req, res)=>{
   updateUser.updateUser(req.body.username, req.body.firstname, req.body.lastname, req.body.DOB, req.body.PED, req.body.email, req.body.usertype, req.body.approved)
    res.redirect('dashboard')
})

router.get('/add', async (req,res)=>{
    res.render('userreports/newuser');
})

router.post('/add', async (req,res)=>{

    let date = new Date()
    let month=("0" + (date.getMonth() + 1)).slice(-2); 
    let day=("0" + (date.getDate())).slice(-2); 
    let DOC = date.getFullYear() + "-" + month + "-" + day;
    
    let username=`${req.body.firstname.slice(0,1).toLowerCase()}${req.body.lastname.replace(/\s+/g, '').toLowerCase()}${month}${date.getFullYear()}`;
    month = ("0" + (date.getMonth() + 4)).slice(-2); 

    let PED = date.getFullYear() + "-" + month + "-" + day;

    let result = await insertUser(username, req.body.firstname, req.body.lastname, req.body.DOB, 'DEFAULTPASS1-', 
        PED, req.body.email, DOC, 'What were the last four digits of your childhood telephone number?', '1234', req.body.usertype, req.body.approved)
    
    if(result){
        res.send("Your have added a user. The user will get an email to notify them their account has been created.")
    }
    else{
        res.send("Email already exists.")
    }
})


module.exports = router;
