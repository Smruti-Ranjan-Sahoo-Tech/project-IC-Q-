const AdminAcessRequestModel = require("../models/AdminAccessRequest.model.js.js");
const UserModel = require("../models/user.model");
const EmailService = require("../config/email.config.js");
const generateToken = require("../utils/generateToken.js");

class SuperadminController {

    static async superAdminLogin(req, res) {
        const { email, password } = req.body;

        if (
            email === process.env.S_ADMIN_EMAIL &&
            password === process.env.SUPERADMIN_PASSWORD
        ) {
            const token = generateToken({ email, role: "superadmin" });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            return res.redirect("/superadmin/admin-requests");
        }

        return res.render("superadmin/login", {
            error: "Invalid credentials"
        });
    }

    // Get all admin requests
    static async getAllAdminRequestUser(req, res) {
        try {
            const allUsers = await AdminAcessRequestModel.find();
            return res.render("superadmin/admin-requests", { data: allUsers });
        } catch (error) {
            console.log("getAllAdminRequestUser:", error.message);
            return res.status(500).render("superadmin/error", { message: "Internal server error" });
        }
    }

    // Accept ALL admin requests
    static async AcceptAllAdminRequest(req, res) {
        try {
            const requests = await AdminAcessRequestModel.find();

            if (!requests.length) {
                return res.status(404).json({ message: "No admin requests found" });
            }

            await Promise.all(
                requests.map(async (reqUser) => {
                    await UserModel.create({
                        username: reqUser.username,
                        email: reqUser.email,
                        hashPassword: reqUser.hashPassword,
                        role: "admin",
                        phone: reqUser.phone,
                        cource: reqUser.cource
                    });

                    await EmailService(
                        reqUser.email,
                        "Admin Access Approved",
                        `<p>Hello ${reqUser.username},</p><p>Your admin access has been approved.</p>`
                    );
                })
            );

            await AdminAcessRequestModel.deleteMany();

            return res.redirect("/superadmin/admin-requests");

        } catch (error) {
            console.log("AcceptAllAdminRequest:", error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    //  Delete ALL admin requests
    static async DeleteAllAdminRequest(req, res) {
        try {
            const requests = await AdminAcessRequestModel.find();

            if (requests.length > 0) {
                await Promise.all(
                    requests.map(async (reqUser) => {
                        await EmailService(
                            reqUser.email,
                            "Admin Request Rejected",
                            `<p>Hello ${reqUser.username},</p><p>Your admin request has been rejected.</p>`
                        );
                    })
                );
            }

            await AdminAcessRequestModel.deleteMany();
            return res.redirect("/superadmin/admin-requests");
        } catch (error) {
            console.log("DeleteAllAdminRequest:", error.message);
            return res.redirect("/superadmin/admin-requests");
        }
    }
    // Accept SINGLE admin request
    static async AcceptAdminRequest(req, res) {
        try {
            const { id } = req.params;

            const reqUser = await AdminAcessRequestModel.findById(id);
            if (!reqUser) {
                return res.status(404).json({ message: "Admin request not found" });
            }

            await UserModel.create({
                username: reqUser.username,
                email: reqUser.email,
                hashPassword: reqUser.hashPassword,
                role: "admin",
                phone: reqUser.phone,
                cource: reqUser.cource
            });

            await AdminAcessRequestModel.findByIdAndDelete(id);

            await EmailService(
                reqUser.email,
                "Admin Access Approved",
                `<p>Hello ${reqUser.username},</p><p>Your admin access has been approved.</p>`
            );

            return res.redirect("/superadmin/admin-requests");

        } catch (error) {
            console.log("AcceptAdminRequest:", error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    //  Delete SINGLE admin request
    static async DeleteAdminRequest(req, res) {
        try {
            const { id } = req.params;

            const deleted = await AdminAcessRequestModel.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: "Admin request not found" });
            }

            await EmailService(
                deleted.email,
                "Admin Request Rejected",
                `<p>Hello ${deleted.username},</p><p>Your admin request has been rejected.</p>`
            );

            return res.redirect("/superadmin/admin-requests");

        } catch (error) {
            console.log("DeleteAdminRequest:", error.message);
            return res.redirect("/superadmin/admin-requests");
        }
    }
    static async getAllAdminDetails(req, res) {
        try {
            const admins = await UserModel.find({ role: "admin" })
            return res.render("superadmin/admin-details", { data: admins })

        } catch (error) {
            console.log("getAllAdminDetails:", error.message);
            return res.redirect("/superadmin/admin-details");

        }
    }
    static async adminDelete(req, res) {
        const { id } = req.params
        try {
            const deleted = await UserModel.findByIdAndDelete(id)
            if (!deleted) {
                return res.status(404).json({ message: "Admin not found" })
            }
            EmailService(
                deleted.email,
                "Admin Account Deleted",
                `<p>Hello ${deleted.username},</p><p>Your admin account has been deleted by the superadmin.</p>`
            );
            return res.redirect("/superadmin/admin-details")
        } catch (error) {
            console.log("DeleteAdminRequest:", error.message);
            return res.redirect("/superadmin/admin-details");
        }

    }
    static async logout(req, res) {
        res.clearCookie('token');
        res.redirect('/superadmin/login');
    }
}

module.exports = SuperadminController;
