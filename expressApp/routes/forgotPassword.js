let express=require('express');
let router=express.Router();
let path=require('path');

router.get('/',(req,res,next)=>{
   res.sendFile(path.join(__dirname,'..','public','staticHtml','forgotPassword.html'));
});

module.exports={
    router:router,
    path:"/forgotPassword",
 }