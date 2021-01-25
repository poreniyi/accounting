let nodemailer = require('nodemailer');

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


let sendEmail=(to,subject,messageContent)=>{
    
    let options={
        to:to,
        subject:subject,
        from:'mancaraapp@outlook.com',
        text:messageContent,
    }
    transport.sendMail(options,(err,data)=>{
    if(err) console.log(err);
    else{
        console.log(`Email sent `+ data.response);
    }
    })
    
}
module.exports={
    sendEmail:sendEmail,
}