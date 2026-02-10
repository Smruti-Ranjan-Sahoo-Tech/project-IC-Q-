const AdminController = require('../controller/admin.controller')
const verifyToken = require('../middleware/authMiddleware')
const authorization = require('../middleware/authorization')

const router=require('express').Router()

// router.get('/',verifyToken,AdminController.createPost)
router.get('/getallpost',verifyToken,authorization("admin"),AdminController.seeAllPost)
router.post('/create-post',verifyToken,authorization("admin"),AdminController.createPost)
router.put('/update-post/:id',verifyToken,authorization("admin"),AdminController.updatePost)
router.delete('/delete-post/:id',verifyToken,authorization("admin"),AdminController.deletePost)

module.exports=router