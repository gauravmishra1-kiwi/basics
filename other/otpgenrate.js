module.exports.genrateotp=()=>{
    let otp="";
    for (let i = 0; i < 4; i++) {
       otp+=Math.floor(Math.random()*10);
       
    }
    return Number(otp)
}

// console.log("otp is",genrateotp());

