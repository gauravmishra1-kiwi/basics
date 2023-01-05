const jwt=require("jsonwebtoken")
const Student=require("../models/students");

const auth =async(req,res,next)=>{
    const token =req.body.token||req.query.token||req.headers["authorzation"];
    if (!token) {
        res.status(200).send({sucess:false,msg:"a token is reqired for authentication."});
    
    }
    try {
        
        const decode=jwt.verify(token,config.secret_jwt);
        req.user=decode;
        next();
    } catch (error) {
        res.status(401).send("error is here",error)
    }
    return;
}
