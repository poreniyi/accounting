let express=require('express');
let router=express.Router();
let path=require('path');

router.get('/',(req,res,next)=>{
   res.sendFile(path.join(__dirname,'..','public','login.html'));
});

module.exports=router;