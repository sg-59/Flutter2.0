const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
app.use(cors())




app.get('/',(req,res)=>{
  res.send('Hello sreerag kb how is it')
})     

const userRouter=require('./Router/userRouter')
const loginRouter=require('./Router/login')

mongoose.connect(process.env.MongoUrl).then(()=>{
    console.log("Database are connected");
}).catch((err)=>{
    console.log("data base connection error");
})


app.use(express.json())

app.use('/binulal',userRouter)
app.use('/api',loginRouter)

const HOST='0.0.0.0';

app.listen(3000,HOST,()=>{  
    console.log("port is 3000 connected");
})


