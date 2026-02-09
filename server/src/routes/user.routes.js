const UserController = require('../controller/user.controller')
const verifyToken = require('../middleware/authMiddleware')

const router=require('express').Router()


router.get('/getpostdata/:cource/:questionType',verifyToken,UserController.getPostData)

module.exports=router