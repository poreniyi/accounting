const bcrypt = require('bcrypt');

let exampleHash='$2b$10$QnAk8e6Zgw8vYVGvng/QW.ic2VNcdQmDlA/64ta.WMJKP3wB1.t62';
let encryptPassword=async (password) =>{
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword)
    }catch(e){
        console.log(e);
    }
}
let decryptPassword=async(password)=>{
    let isCorrectPassword=await bcrypt.compare(password,exampleHash);
    console.log(isCorrectPassword);
}
decryptPassword('password');


module.exports={
    encryptPassword:encryptPassword,
    decryptPassword:decryptPassword,
}
