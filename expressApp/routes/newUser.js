let express=require('express');
let router=express.Router();
let path=require('path');

router.get('/',(req,res,next)=>{
   res.sendFile(path.join(__dirname,'..','public','staticHtml','newUser.html'));
});
router.post('/create',(req,res,next)=>{
   console.log(req.body);
   let date=new Date();
   let month=("0" + (date.getMonth() + 1)).slice(-2); 
   let userId=`${req.body.first.slice(0,1).toUpperCase()}${req.body.last}${month}${date.getFullYear()}`;
   console.log(userId);
   res.send('received');
})
module.exports={
   router:router,
   path:"/newUser",
}