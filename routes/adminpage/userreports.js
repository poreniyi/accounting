let express = require('express');
let router = express.Router();

router.get("/report", (req,res,next)=>{
   /*
        Database function that returns an array of json objects with the following properties:
        FirstName,LastName,DOB,email ddress,ped,doc
   */
    res.render('userreports/allusers.ejs');
   // res.send("hi");
});



module.exports = router;
