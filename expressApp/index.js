let express=require('express');
let app=express();
let path=require('path');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing
let routeHandler= require('./routes/routeAdder/addRoutes');
routeHandler.addRoutes(app);



app.use(express.static(__dirname + '/public'));
//view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));




app.listen(process.env.PORT || 3000,()=>{
    console.log("Now listening for requests");
})