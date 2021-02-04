let express = require('express');
let report = require("../../database/UserReport.js");
let router = express.Router();
let updateUser = require("../../database/UpdateUser.js");
//let addUser = require("../../database/AddUser");

router.get("/report", async function (req,res,next){

    let data = await report.getReport();

    res.render('userreports/allusers.ejs',data);
});

router.get('editUser',()=>{
    redirect('/edit');
})

router.get('/edit', (req,res)=>{
    res.render('userreports/editpage',req.query);
})

router.post('/edit', (req, res)=>{
   updateUser.updateUser(req.body.username, req.body.firstname, req.body.lastname, req.body.ped, req.body.email, req.body.usertype, req.body.approved)
    console.log(req.body)
    res.send('YEET')
})

router.get('/add', (req,res)=>{
    res.render('userreports/newuser');
})


module.exports = router;
