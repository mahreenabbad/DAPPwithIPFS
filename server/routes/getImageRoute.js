const express = require("express")
const router = express.Router()
const {getImageController} = require("../controllers/getImageController")
const {authenticationToken} =require('../middleware/authenticateToken')

router.post("/getImage",authenticationToken,getImageController)


module.exports = router;