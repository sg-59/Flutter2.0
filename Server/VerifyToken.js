const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{

    console.log('jsonwebtoken',req.headers.token);

let authHeader=req.headers.token  
    
if(authHeader){   
   const token=authHeader.split(" ")[1];
   console.log("Token only",token);
jwt.verify(token,process.env.Jwtsec,(err,user)=>{
    if(err) res.status(403).json('token is not valid')
    console.log("********************************************************************",user.id,req.params.id);
if(user.id==req.params.id){
    next();
}else{
return res.status(403).json("Your Id and token missmatch")
}

}) 
}else{ 
    return res.status(401).json('you are not authenticated')
}

};

// const verifyTokenAndAuthorization =(req,res,next)=>{
//     verifyToken(req,res,()=>{
//         if(req.user.id === req.params.id){
//             next();
//         }else{
//             res.status(403).json('you are not allowed to that !');
//         } 
//     })
// }




module.exports={ verifyToken}