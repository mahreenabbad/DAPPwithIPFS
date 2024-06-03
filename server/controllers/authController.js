const ethers = require("ethers")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")
const {jWT_SECRETKEY}= require("../config/serverConfig")

async function authController(req,res,next){
    try {
        const {signature} =req.body;
        const {address} = req.query;
        
        if(!signature){
        throw new Error("signature is inValid ")
        }
        const recoverAddress=  ethers.utils.verifyMessage("Welcome to crypto Valut",signature)
        if(address.toLowerCase()===recoverAddress.toLocaleLowerCase()){

            const address = recoverAddress.toLowerCase();
            const users = await UserModel.findOne({userAddress:address})
            if(!users){
              const userData=await UserModel.create({userAddress:address})
              console.log(userData)
            }
            const token =jwt.sign({
                 address
            },jWT_SECRETKEY)
            res.status(200).json({message:"Authentiction Successful",token})
        }else{
         res.status(400).json({message:"Authentiction Failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server Error"})
    }



}

module.exports= {authController}