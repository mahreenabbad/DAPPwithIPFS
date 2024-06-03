const crypto = require("crypto")

const decryptData =(encrypteData,iv,encryptionKey)=>{
    try {
        if(typeof iv ==='object' && iv.type ==='Buffer' && Array.isArray(iv.data)){
            iv= Buffer.from(iv.data)
        }
        if(typeof encrypteData==='object' && encrypteData.type==='Buffer' && Array.isArray(encrypteData.data)){
            encrypteData = Buffer.from(encrypteData.data)
        }
         // Create a decipher object with the same algorithm and key
         const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
         const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
         return decryptedData;
    } catch (error) {
        console.log(error)
    }
}
module.exports = { decryptData };