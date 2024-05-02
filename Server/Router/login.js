const router=require('express').Router()
const user=require('../Model/User')
const Crypto=require('crypto-js')
const JWT=require('jsonwebtoken')
router.post('/login', async (req,res)=>{
    console.log("*************",req.body);
    try{
const finduser=await user.findOne({Email:req.body.email})
console.log("finduser",finduser);
!finduser && res.status(401).json("Invalid email") 
const hashedPassword=Crypto.AES.decrypt(finduser.Password,process.env.PassSecKey)
console.log("hashedpassword",hashedPassword);
var originalpassword = hashedPassword.toString(Crypto.enc.Utf8);
console.log("originalpassword",originalpassword);

req.body.password != originalpassword && res.status(401).json('invalid password')

const Token=JWT.sign({
    id:finduser._id
},process.env.Jwtsec,{expiresIn:'1d'})
console.log("token",Token);

res.status(200).json({Token,id:finduser._id}) 

    }catch(err){ 
res.status(500).json("err")
    }finally{
 
    }
})


module.exports=router