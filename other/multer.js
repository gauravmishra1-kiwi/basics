const express=require("express")
const app=express();
const multer=require("multer")

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"upload")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.filename+"-"+Date.now()+".jpg ")
        }
    })
}).single("user_file")

app.post("/upload",upload,(req,res)=>{
    res.send("file uploaded");
})


// const upload=multer({
//     dest: 'upload'
// })
//     app.post("/upload",upload.single('upload'),(req,res)=>{
//         res.send("file uploaded");
//     })

app.listen(6000);