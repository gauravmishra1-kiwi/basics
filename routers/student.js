const express=require("express")
 const router= new express.Router();
const bcrypt=require("bcryptjs")
const Student=require("../models/students")
const jwt=require("jsonwebtoken");
 const { secret } = require("parse");
const auth=require("../middleware/auth")
const {forgotPasswordEmail}=require('../other/nodemailer')
const lodash = require('lodash');
const { update } = require("lodash");


router.post("/signup",async(req,res)=>{
    // try {
    //     const user= new Student(req.body);
        
        
    //     //webtoken genrate
    //     // const token=await user.generateAuthToken();
    //     // console.log(" the token part"+token);

    //     const createUser = await user.save();
    //     //  console.log(" the token part"+createUser);

    //     res.status(200).send(createUser, token);

    // }
    try{
        const user = new Student ({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:req.body.password,
          
        })
        await  user.save(user)
        //  sendWelcomeEmail(user.email,user.name)
         const token = await user.generateAuthToken() 
        return res.status(201).send({message : 'User register successfully', data:user, token,status : 201})
     } 
      
    catch (err) {
        res.send(err);
    }
})  


//read the user

router.post("/login",async(req,res)=>{
    // try {
    //     const email=req.body.email
	//     const password=req.body.password

    //     const usermail=await Student.findOne({email:email});

    //     const ismatch= await bcrypt.compare(password,usermail.password);

    //     //webtoken authentication
    //     const token=await usermail.generateAuthToken();
    //     console.log(" the token part",token);

    //     if (ismatch) {
    //         return res.status(200).send("login successfully..")
    //     }
    //     else{
    //         return res.status(400).send("login unsuccessfully..")

    //     }

    try {
        
        const user = await Student.findByCredentials(req.body.email, req.body.password)
        // const token = await user.generateAuthToken() 
                  //*********** */
        res.status(200).send({message:'User login successfully', data:user,/*token,*/ status : 200 })
    } 
catch(err){
    console.log("invalid email", err);
}
})

// router.get("/secret",auth,(req,res)=>{
    
//     res.render("secret")
// })

//get individual data of aprticular student
// router.get("/students/:id",async(req,res)=>{
//     try {
//         const _id =req.params.id;
//         const studentData = await Student.findById(_id);
//         res.send(studentData);

//         if (!studentdata) {
//             return res.status(404).send();
//         } else {
//             res.send(studentData);
//         }
//     } catch (error) {
//         res.send(error)
//     }
// })

// // update by id
// router.patch("/students/:id",async(req,res)=>{
//     try {
//         const _id =req.params.id;
//         const updateStudedents = await Student.findByIdAndUpdate(_id,req.body);
//         res.send(updateStudedents);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

// //delete by id
// router.delete("/students/:id",async(req,res)=>{
//     try {
//         // const _id=req.params.id;
//         const deleteStudents= await Student.findByIdAndDelete(req.params.id);
//         if(!req.params.id){
//             return res.status(404).send();
//         }
//         res.send(deleteStudents);
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.get("/users/me", async (req, res) => {
//     try{
//         const users = req.user
//         const user = await Student.findOne({_id:users})   

//         res.status(200).send({message:'User Data found', data:user, status : 200 });
//     } catch(err){
//         res.status(400).send({message:'User Data not found', data:null, status : 400 });
//     }   
// });

router.put("/users/forgot_password",async(req,res)=>{
    try {
        const user=await Student.findOne(req.body)
        
        if (!user) {
            return res.status(400).send({message: 'Incorrect Email',status:400})
        }
        else{
            
            let  abc =  forgotPasswordEmail(user.email)

            console.log(abc)
            user.updateOne({otp:abc},function (err){ 
                if(err){
                    return res.status(400).send({message:'Reset password link error',status:400});
                }
                else{
                   
                    
                    return res.status(200).send({message:'Email has been send, Kindly follow the instruction',status:200});
                }
            })
           
        }
    } catch (error) {
        console.log(error);
    }

    
})

router.put("/users/forgot_password_update",async(req,res)=>{
    try {
            console.log(req.body)
            const email = req.body.email 
          const hashedPassword = await bcrypt.hash(req.body.password,10)
          console.log(hashedPassword)

        const user=await Student.findOne({email:email })


      
        if(user.otp === req.body.otp){
              user.updateOne({
                otp : 0,
                password: hashedPassword

            },function(err){
                if(err){
                    res.status(400).json({message:"err"})
                }
                else{
                    res.status(200).json({message:"password updated"})
                }
            })
        }
        else {
            return res.status(400).send({message: 'Incorrect Email',status:400})
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports=router;