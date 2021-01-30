let path = require('path')
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
let mongoose = require('mongoose');
let Users= require('./userModels');



let sampleUser={
    username:'Sampple2',
    firstName:'test',
    Email:'email@email.com',
    Password:'password2',
}
mongoose.connection.on('connecting',()=>{
    `Connected to the database`;
})
mongoose.connection.on('error',()=>{
    console.log(err);
})

 mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true,useUnifiedTopology:true },()=>{
    //console.log(mongoose.connection);
 });


 mongoose.connection.on('connecting',()=>{
    console.log(`Connection starting`);
})
mongoose.connection.on('open',()=>{
    console.log(`Connection opened to thee database`);
    // Users.create(sampleUser,(err,result)=>{
    //     console.log(result);
    // });
})
mongoose.connection.on('disconnected',()=>{
    console.log(`Connection closed`);
})
mongoose.connection.on('disconnecting',()=>{
    console.log(`Connection closed`);
})

mongoose.connection.on('error',()=>{
    console.log(err);
})
