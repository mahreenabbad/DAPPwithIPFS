const ethers = require("ethers")
const UserModel = require("../models/User")
const {PINATA_APIKEY,PINATA_SECRETKEY} = require("../config/serverConfig")
const {genrateEncryptionKey} =require("../utils/generateKey")
const {encryptFile} = require("../utils/encryption")

async function uploadImageController(req,res,next){
    try {
        const address =req.address;
        const userAddress = address.toLowerCase()
        const user = await UserModel.findOne({userAddress:userAddress})
        if(!user){
            throw new Error("user not exist")
        }
        if(user.encryptionKey===null){
            const encryptionKey = genrateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save()
        }
        const {encryptedData, iv} = encryptFile(req.file.buffer,user.encryptionKey);
        
        // Use the api keys by specifying your api key and api secret
        const pinataSDK = require('@pinata/sdk');
        const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETKEY });
        const resPinata = await pinata.pinJSONToIPFS({encryptedData,iv})
        
        res.status(200).json({ipfsHash:resPinata.IpfsHash,message:"Image Uploaded"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }



}

module.exports= {uploadImageController}