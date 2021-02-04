let nodemailer = require('nodemailer');
let fs=require('fs').promises;
let path=require('path');

let transport = nodemailer.createTransport({
    service:'Outlook365',
    auth:{
            user:'mancaraapp@outlook.com',
            pass:'adaaaabob26'
    }
})


let newEmail = {
    to:'',
    subject: 'passwordreset',
    from:'mancaraapp@outlook.com',
    text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n'
}


let sendEmail=async (to,subject,messageContent)=>{
    
  let isSuccesful='';
    let options={
        to:to,
        subject:subject,
        from:'mancaraapp@outlook.com',
        text:messageContent,
    }
    transport.sendMail(options,async(err,data)=>{
    if(err) console.log(err);
    else{
        isSuccesful=true;
        console.log(`Email sent `+ data.response);
        let today=new Date();
        let count=await fs.readFile(path.join(__dirname,'emailCount.json'),'utf8');
        let day=1000*60*60*24;
        count=JSON.parse(count);
        count.date=new Date(count.date);
        if(today.getTime()-count.date.getTime()<day){//continue
            count.emailsSent++;
            let writeData=JSON.stringify(count);
            fs.writeFile(path.join(__dirname,'/emailCount.json'),writeData,'utf8');
        }else{
            count.emailsSent=0;
            count.date=today;
            fs.writeFile(path.join(__dirname,'./emailCount.json'),writeData,'utf8');
            console.log('false');
        }
    }
    })
    return isSuccesful;
}

//sendEmail('poreniyi@gmail.com,','account created','your account has been created'); //5 sent
module.exports={
    sendEmail:sendEmail,
}