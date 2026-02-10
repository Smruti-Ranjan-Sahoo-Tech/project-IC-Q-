const express=require('express')
const SuperadminController = require('../controller/superadmin.controller')
const verifyToken = require('../middleware/authMiddleware');
const authorization = require('../middleware/authorization');
const router=express.Router()

router.get("/login", (req, res) => {
  res.render("superadmin/login", { error: null });
});

router.post("/login", SuperadminController.superAdminLogin);

// Protected routes - require isSuperAdmin middleware
router.get("/dashboard", verifyToken,authorization("superadmin"), (req, res) => {
  res.render("superadmin/dashboard");
});

router.get("/admin-requests",verifyToken, authorization("superadmin"), SuperadminController.getAllAdminRequestUser);

router.post('/acceptAllAdminRequest',verifyToken, authorization("superadmin"), SuperadminController.AcceptAllAdminRequest);

router.delete('/deleteAllAdminRequest', verifyToken, authorization("superadmin"), SuperadminController.DeleteAllAdminRequest);

router.post('/acceptAdminRequest/:id',verifyToken, authorization("superadmin"), SuperadminController.AcceptAdminRequest);

router.delete('/deleteAdminRequest/:id', verifyToken, authorization("superadmin"), SuperadminController.DeleteAdminRequest);
router.get('/getAllAdminDetails', verifyToken, authorization("superadmin"), SuperadminController.getAllAdminDetails);
router.delete('/adminDelete/:id', verifyToken, authorization("superadmin"), SuperadminController.adminDelete);

router.get('/logout',verifyToken, authorization("superadmin"),SuperadminController.logout);

module.exports=router