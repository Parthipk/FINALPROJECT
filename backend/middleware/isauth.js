
const jwt = require("jsonwebtoken")

const isauth = (req,res,next)=>{
    const token = req.cookies.token
    
    if(!token){
        throw new Error(" token not created  ")
    }

   try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decode
    
    next()
   }catch(err){
    console.error("token not created eroor occured",err)
   }
}

module.exports = isauth