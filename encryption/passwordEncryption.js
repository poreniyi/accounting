const bcrypt = require('bcrypt');


let encryptPassword=async (password) =>{
    try{
        const hashedPassword=await bcrypt.hash(password,12);
        return hashedPassword;
    }catch(e){
        console.log(e);
    }
}
let decryptPassword=async(password, DBPassword)=>{
    let isCorrectPassword=await bcrypt.compare(password,DBPassword);
    return isCorrectPassword;
}

module.exports={
    encryptPassword:encryptPassword,
    decryptPassword:decryptPassword,
}
