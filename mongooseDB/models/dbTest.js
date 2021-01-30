let mongoose = require('mongoose');
let Users= require('./userModels');
//const uri = "mongodb://user1:user1@cluster0.ib9si.mongodb.net/AppDomainDatabase?retryWrites=true&w=majority";
//const uri = "mongodb+srv://user1:user1@cluster0.ib9si.mongodb.net/Data2?retryWrites=true&w=majority";
var uri = "mongodb://user1:user1@cluster0-shard-00-00.ib9si.mongodb.net:27017,cluster0-shard-00-01.ib9si.mongodb.net:27017,cluster0-shard-00-02.ib9si.mongodb.net:27017/Data2?ssl=true&replicaSet=atlas-lcv1f0-shard-0&authSource=admin&retryWrites=true&w=majority";

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

 mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true },()=>{
    //console.log(mongoose.connection);
 });


 mongoose.connection.on('connecting',()=>{
    console.log(`Connection starting`);
})
mongoose.connection.on('open',()=>{
    console.log(`Connection open`);
    Users.create(sampleUser,(err,result)=>{
        console.log(result);
    });
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
