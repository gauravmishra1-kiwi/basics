
const mongoose= require("mongoose");


mongoose.connect("mongodb://localhost:27017/signup",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{                                            //proise
    console.log("connection is sucessfully..");
}).catch((e)=>{
    console.log("connection error",e);
})         
