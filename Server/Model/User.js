const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Age:{type:String,required:true},
    Mob:{type:Number,required:true},
    City:{type:String,required:true},
    Password:{type:String,required:true}
    
},{timestamps:true})

module.exports=mongoose.model("Flutter2024",userSchema)