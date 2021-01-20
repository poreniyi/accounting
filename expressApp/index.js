let express=require('express');
let app=express();
let path=require('path');
let loginRoute= require('./routes/login');
let navBar=require('./routes/home');

//routing
app.use('/',loginRoute);
app.use('/nav',navBar);

app.use(express.static(__dirname + '/public'));
//view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));




app.listen(process.env.PORT || 3000,()=>{
    console.log("Now listening for requests");
})