let path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../.env')});
let MongoClient= require('mongodb').MongoClient;
const client = new MongoClient(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const collections= client.db('Data1');
        let sessions=collections.collection('sessions');
        let query={'session.passport.user':'admin'};
        //let results=await sessions.findOne(query);
        let results=await sessions.findOne(query);
       // console.log(results.session.userType);
       let newValues={$set:{'session.status':false}};
       let update=await sessions.updateMany(query,newValues);
      //console.log(update);
    }finally{
        client.close(()=>{
            console.log('db connection closed');
        });
    }
}

async function changeStatus(user,status){
    try{
        await client.connect();
        const collections= client.db('Data1');
        let sessions=collections.collection('sessions');
        let query={'session.passport.user':user};
        let activationStatus = status==1 ? true :false;
        let results=await sessions.findOne(query);
       let newValues={$set:{'session.status':activationStatus}};
       let update=await sessions.updateMany(query,newValues);
        console.log(results);
    }finally{
        client.close(()=>{
            console.log('db connection closed');
        });
    }
}

//run().catch(console.dir);

module.exports={
   changeStatus: changeStatus,
}