const express=require("express")
const app=express();
const nodemailer=require("nodemailer")
const otp=require("../other/otpgenrate")


function digits_count(n) {
    var count = 0;
    if (n >= 1) ++count;
    
    while (n / 10 >= 1) {
        n /= 10;
        ++count;
    }
    
    return count;
}


//mail transporter
const transport=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:465,
    requireTLS:true,
    auth:{
        user:'gaurav.mishra1@kiwitech.com',
        pass:"rmuscfrnksqdflga"
    }
})
    
    
const abc=otp.genrateotp()
    
    
const forgotPasswordEmail = (email)=>{
    if(digits_count(abc)==4){
        const msg={
            from:'gaurav.mishra1@kiwitech.com',
            to:email,
            subject:"your otp from gaurav",
            text :"your otp is",
            html:`<p>otp is ${abc}</p>`,
            // attachments:[{
                //     filename:'images.jpeg',
                //     path:__dirname+'/upload/images.jpeg',
                //     cid:"images"
            
            // }]
            
        }
       
        
        transport.sendMail(msg,(error)=>{
            if (error) {
                console.log("error occuer",error);
            }
            else{
                console.log("email has been send");
            }
        })
 
   }

   return abc
   
}

module.exports={forgotPasswordEmail}

