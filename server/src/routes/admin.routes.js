const AdminController = require('../controller/admin.controller')
const verifyToken = require('../middleware/authMiddleware')

const router=require('express').Router()

// router.get('/',verifyToken,AdminController.createPost)
router.get('/getallpost',verifyToken,AdminController.seeAllPost)
router.post('/create-post',verifyToken,AdminController.createPost)
router.put('/update-post/:id',verifyToken,AdminController.updatePost)
router.delete('/delete-post/:id',verifyToken,AdminController.deletePost)

module.exports=router