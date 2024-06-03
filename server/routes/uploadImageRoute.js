const express = require("express")
const router = express.Router()
const {uploadImageController} = require("../controllers/uploadImageController")
const {uploadUserImage} =require("../middleware/multer")
const {authenticationToken} =require('../middleware/authenticateToken')

router.post("/uploadImage",authenticationToken,uploadUserImage,uploadImageController)


module.exports = router;