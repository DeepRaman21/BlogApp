const nodemailer = require("nodemailer")
require("dotenv").config()
function sendEmail({email,otp1}){
    console.log(otp1)
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        
        var mail_configs={
            from:process.env.EMAIL,
            to:email,
            subject:"Password Recovery",
            html:`
            <h1>Hello, ${email}</h1>
            <h2>Your OTP is ${otp1}</h2>`
        }
        transporter.sendMail(mail_configs,(error,info)=>{
            if(error){ 
                console.log(error)
                return reject(error)
            }else{
                return resolve({msg:"One Time Password is Send on your Email"})
            }
        })
    })
}

module.exports = sendEmail 