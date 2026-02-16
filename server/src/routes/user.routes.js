const UserController = require('../controller/user.controller')
const verifyToken = require('../middleware/authMiddleware')
const authorization = require('../middleware/authorization')

const router=require('express').Router()


router.get('/getpostdata/:cource/:subject/:questionType',verifyToken, authorization("user"),UserController.getPostData)
router.get('/getSubjectName/:cource',verifyToken, authorization("user"),UserController.getSubjectName)

module.exports=router
