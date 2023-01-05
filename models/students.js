require('dotenv').config();
const mongooes= require("mongoose");
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const studentSchema=new mongooes.Schema({
    name : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }

    },
    phone : {
        type:Number,
        required:true,
        unique:false,
    },
   address:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   tokens:[{
    token:{
        type:String,
        required:true
    }
   }],
   otp:{
    type:Number
   }

})

//token genrate
studentSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},process.env.secrate_key);
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send("token genrate error")
    }
}

studentSchema.statics.findByCredentials=async(email,password)=>{
    const user=await Student.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const ismatch=await bcrypt.compare(password, user.password)

    if(!ismatch){
        throw new Error('Unable to login')
    }

    return user
}


//console.log(process.env.secret_key);
// bcryption 

studentSchema.pre("save",async function(next){
    if (this.isModified("password")) {
        console.log(`the password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`the password is${this.password}`);

    }
    next();
})


// we will create a new model

const Student =new mongooes.model("gaurav",studentSchema); 

module.exports =Student;

