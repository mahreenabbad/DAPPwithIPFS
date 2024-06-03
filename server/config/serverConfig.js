require('dotenv').config();

// never use special character in you mongodb password
module.exports={
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
    PINATA_APIKEY: process.env.PINATA_APIKEY,
    PINATA_SECRETKEY: process.env.PINATA_SECRETKEY,
    jWT_SECRETKEY: process.env.jWT_SECRETKEY
}