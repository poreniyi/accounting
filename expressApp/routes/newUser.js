let express=require('express');
let router=express.Router();
let path=require('path');

router.get('/',(req,res,next)=>{
   res.sendFile(path.join(__dirname,'..','public','staticHtml','newUser.html'));
});
router.post('/create',(req,res,next)=>{
   console.log(req.body);
   res.send('received');
})
module.exports={
   router:router,
   path:"/newUser",
}