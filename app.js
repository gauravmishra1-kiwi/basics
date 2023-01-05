require('dotenv').config();

const express =require('express');
require("./db/conn");
const Student =require ("./models/students");
const studentRouter=require("./routers/student");
var bodyParser = require('body-parser');
const { secret } = require('parse');



const app= express();
const port =process.env.PORT ||6001;

app.use(express.json())
app.use(studentRouter);


//certe a student without async await(all restapi`s written in route(we can write also here))

// app.post("/students",(req,res)=>{
//     try{
//     console.log(req.body);
//     const user =new Student(req.body);
//     user.save()
//       res.status(201).send(user)
//     }catch(err) {
//         res.status(400).send(err);
//     }
// res.send("hello from server")
// })



app.listen(port,()=>{
    console.log(`connection sucess at ${port}`);
})