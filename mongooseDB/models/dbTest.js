let path = require('path')
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
let mongoose = require('mongoose');
let Users= require('./userModels');
let fs=require('fs').promises;


let encryption=require('../../encryption/passwordEncryption');
const passwordEncryption = require('../../encryption/passwordEncryption');

mongoose.connection.on('connecting',()=>{
    `Connected to the database`;
})
mongoose.connection.on('error',()=>{
    console.log(err);
})



 mongoose.connection.on('connecting',()=>{
    console.log(`Connection starting`);
})
mongoose.connection.on('open',async ()=>{
    console.log(`Connection opened to the database`);
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

mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true,useUnifiedTopology:true },()=>{
   // readData();
    //makeUnique();
 });
let readData=async ()=>{
    let data=await fs.readFile('../sampleUsers.json', 'utf-8');
    data=JSON.parse(data);
    let users=data.users;
    users.forEach(async element=>{
        element.Password=await encryption.encryptPassword('passdoe');
        console.log(element);
        Users.create(element);
    })
}
 
let makeUnique= async()=>{
    let data=await Users.find({username:'user1-1'},'username').sort('-username').limit(1);
    let sameNameCount=await Users.countDocuments({username:'user1-1'});
    let newUsername= data[0].username;
    console.log(`The current newUsername is ${newUsername}`);
    if(sameNameCount==1){
       // newUsername= data[0].username+=`-1`;
    }else{
        let field=newUsername.split('-');
        field[1]=Number(field[1])+1
        console.log(field[1]);
        console.log(field[0]);
        newUsername= `${field[0]}-${field[1]}`;
    }
    console.log(newUsername);

}
