let mongoose = require('mongoose');
let Schema=mongoose.Schema;

let UserSchema= new Schema({
    username:{type:String,},
    firstName:{type: String},
    lastName:{type: String},
    Password:{type:String},
    Email:{type:String},
    DOB:{type:Date},
    PED:{type:Date},
    DOC:{type:Date},
    Question:{type:String},
    Answer:{type:String},
    userType:{type:String,enum:['admin','manager','regular'],lowercase:true},
    pendingNewPassword:{type:Boolean},
    pendingActivation:{type:Boolean},
    passwordToken:{typee:String},
})

let Users= mongoose.model('Users',UserSchema);

module.exports=Users;


