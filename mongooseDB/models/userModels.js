let mongoose = require('mongoose');
let Schema=mongoose.Schema;

let UserSchema= new Schema({
    username:{type:String,},
    firstName:{type: String},
    lastName:{type: String},
    DOB:{type:Date},
    Password:{type:String},
    PED:{type:Date},
    Email:{type:String},
    DOC:{type:Date},
    Question:{type:String},
    userType:{type:String,enum:['admin','manager','regular'],lowercase:true},
    pendingNewPassword:{type:Boolean},
    pendingActivation:{type:Boolean},
})
let sampleUser={
    username:'Sampe',
    firstName:'test',
}
let Users= mongoose.model('Users',UserSchema);

module.exports=Users;


