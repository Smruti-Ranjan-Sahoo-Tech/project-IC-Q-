const UserController = require('../controller/user.controller')
const verifyToken = require('../middleware/authMiddleware')
const authorization = require('../middleware/authorization')

const router=require('express').Router()


router.get('/getpostdata/:cource/:questionType',verifyToken, authorization("user"),UserController.getPostData)

module.exports=router