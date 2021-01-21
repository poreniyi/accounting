let express=require('express');
let router=express.Router();
let path=require('path');

router.get('/',(req,res,next)=>{
   res.render('../views/partialViews/navbar');
});

module.exports={
   router:router,
   path:"/nav",
}