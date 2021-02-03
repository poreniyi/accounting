let express = require('express');
let report = require("/workspaces/accounting/database/UserReport.js")
let router = express.Router();

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

module.exports = router;
