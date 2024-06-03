 const jwt = require('jsonwebtoken');
 const {jWT_SECRETKEY} =require("../config/serverConfig")
 
 const authenticationToken=(req,res,next)=>{
    try {
         const token = req.headers['x-access-token']
         console.log(token)
         if(!token){
           throw new Error("No Token Found")
    }
    const decoded = jwt.verify(token,jWT_SECRETKEY)
    req.address = decoded.address;
    next()
    // console.log(decoded)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
   

}
module.exports={authenticationToken}