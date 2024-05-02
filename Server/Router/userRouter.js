const router=require('express').Router()
const user=require('../Model/User')
const Crypto_pass=require('crypto-js');
const { verifyToken, verifyTokenAndAuthorization } = require('../VerifyToken');

router.post('/signup',async (req,res)=>{
    console.log("req.body",req.body);

    try{
const newUser=new user({
    Firstname:req.body.name,
    Lastname:req.body.Lname,
    Email:req.body.email,
    Mob:req.body.mob,
    City:req.body.city,
    Password:Crypto_pass.AES.encrypt(req.body.password,process.env.PassSecKey).toString(),
    Age:req.body.age
})
const savedData=await newUser.save()
console.log("savedData",savedData);
res.status(200).json(savedData)
    }catch(err){
res.status(500).json('failed')
    }
})

router.get('/getdata',async (req,res)=>{
    console.log("req.body",req.body.id);
    try{
const singledata=await user.find()
res.status(200).json(singledata)
    }catch(err){
res.status(500).json('error')
    }
})
router.get('/singledata',async (req,res)=>{
    console.log("req.query",req.query);
    try{
        const singledata=await user.findOne({Email:req.query.email})
        res.status(200).json(singledata)
    }catch(err){

    }
})

router.delete('/deletedata/:id',async (req,res)=>{
    try{
await user.findByIdAndDelete(req.params.id)
res.status(200).json("data deleted")
    }catch(err){
res.status(500).json("failed")
    }
})

router.put('/updateData/:id',async (req,res)=>{
    try{
const UpdateData=await user.findByIdAndUpdate(req.params.id,{
    $set:{Firstname:req.body.name}
},{new:true})
res.status(200).json(UpdateData)
    }catch(err){

res.status(500).json(err.message)
    }
})

// router.get('/mongoquerry', async (req,res)=>{
//     try{

// // const data=await user.find({City:"Kochi"})
// // const data=await user.find({Age:{$lt:25}})
// // const data=await user.find({Age:{$ne:21}})
// // const data=await user.find({Age:{$nin:[21,22]}})
// // const data=await user.find({$and:[{Age:{$gte:22}},{Age:{$lte:25}}]})

// const data=await user.aggregate([{$project:{Firstname:1,Email:1,_id:0,City:1}}])
// res.status(200).json(data)
//     }catch(err){
// res.status(500).json(err.message)
//     }
// })

router.get('/GetMyprofileData/:id',verifyToken, async (req,res,next)=>{
    try{
const myprofile=await user.findById(req.params.id)
next()  
res.status(200).json(myprofile)
    }catch(err){
res.status(500).json(err)
    }
},(req,res,next)=>{
    console.log("last work");
    next()
},(req,res)=>{
    console.log("last check ",req.params.id);
})

module.exports=router