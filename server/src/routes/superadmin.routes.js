const express=require('express')
const SuperadminController = require('../controller/superadmin.controller')
const isSuperAdmin = require('../middleware/isSuperAdmin');
const verifySuperAdmin = require('../middleware/verifySuperAdmin');
const router=express.Router()

router.get("/login", (req, res) => {
  res.render("superadmin/login", { error: null });
});

router.post("/login", SuperadminController.superAdminLogin);

// Protected routes - require isSuperAdmin middleware
router.get("/dashboard", verifySuperAdmin, (req, res) => {
  res.render("superadmin/dashboard");
});

router.get("/admin-requests", verifySuperAdmin, SuperadminController.getAllAdminRequestUser);

router.post('/acceptAllAdminRequest', verifySuperAdmin, SuperadminController.AcceptAllAdminRequest);

router.delete('/deleteAllAdminRequest', verifySuperAdmin, SuperadminController.DeleteAllAdminRequest);

router.post('/acceptAdminRequest/:id', verifySuperAdmin, SuperadminController.AcceptAdminRequest);

router.delete('/deleteAdminRequest/:id', verifySuperAdmin, SuperadminController.DeleteAdminRequest);

router.get('/logout', (req, res) => {
  res.clearCookie('superadmin');
  res.redirect('/superadmin/login');
});

module.exports=router