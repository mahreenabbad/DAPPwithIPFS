const crypto = require("crypto");

const genrateEncryptionKey =(length)=>{
    return crypto.randomBytes(length/2).toString('hex');
}
module.exports= {genrateEncryptionKey}