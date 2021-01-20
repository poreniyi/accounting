let express=require('express');
let app=express();
let loginRoute= require('./routes/home');


app.use('/',loginRoute);
app.use('/public',express.static('./public'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000,()=>{
    console.log("Now listening for requests");
})