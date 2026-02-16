const AdminAcessRequestModel = require("../models/AdminAccessRequest.model.js.js");
const UserModel = require("../models/user.model");
const EmailService = require("../config/email.config.js");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");

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

                    // Generate password reset token
                    const resetToken = jwt.sign({ id: reqUser._id }, process.env.JWT_SERVER_SECREAT, { expiresIn: "1h" });
                    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

                    // Professional email to approved admin with password reset link
                    await EmailService(
                        reqUser.email,
                        "Admin Account Verified - Set Your Password",
                        `<p>Dear ${reqUser.username},</p>
                        <p>We are pleased to inform you that your admin account has been successfully verified and approved.</p>
                        <p>To complete your account setup, please click the button below to set your password:</p>
                        <p style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Set Your Password</a>
                        </p>
                        <p><strong>Important:</strong> This link will expire in 1 hour.</p>
                        <p>If the button above doesn't work, copy and paste this link in your browser:</p>
                        <p>${resetUrl}</p>
                        <p>Welcome to the team!</p>
                        <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
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
                            "Admin Request Status Update",
                            `<p>Dear ${reqUser.username},</p>
                            <p>Thank you for your interest in becoming an admin. Unfortunately, your admin request has been declined at this time.</p>
                            <p>If you have any questions or would like more information, please feel free to contact our support team.</p>
                            <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
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

            const newAdmin = await UserModel.create({
                username: reqUser.username,
                email: reqUser.email,
                hashPassword: reqUser.hashPassword,
                role: "admin",
                phone: reqUser.phone,
                cource: reqUser.cource
            });

            // Generate password reset token
            const resetToken = jwt.sign({ id: newAdmin._id }, process.env.JWT_SERVER_SECREAT, { expiresIn: "1h" });
            const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

            await AdminAcessRequestModel.findByIdAndDelete(id);

            // Professional email to approved admin with password reset link
            await EmailService(
                reqUser.email,
                "Admin Account Verified - Set Your Password",
                `<p>Dear ${reqUser.username},</p>
                <p>We are pleased to inform you that your admin account has been successfully verified and approved.</p>
                <p>To complete your account setup, please click the button below to set your password:</p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Set Your Password</a>
                </p>
                <p><strong>Important:</strong> This link will expire in 1 hour.</p>
                <p>If the button above doesn't work, copy and paste this link in your browser:</p>
                <p>${resetUrl}</p>
                <p>Welcome to the team!</p>
                <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
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
                "Admin Request Status Update",
                `<p>Dear ${deleted.username},</p>
                <p>Thank you for your interest in becoming an admin. Unfortunately, your admin request has been declined at this time.</p>
                <p>If you have any questions or would like more information, please feel free to contact our support team.</p>
                <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
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
                "Admin Account Terminated",
                `<p>Dear ${deleted.username},</p>
                <p>We regret to inform you that your admin account has been terminated by the SuperAdmin.</p>
                <p>If you believe this is a mistake or have any questions, please contact our support team.</p>
                <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
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
    static async freezeAdmin(req, res) {
            try {
                const { id } = req.params;
    
                const user = await UserModel.findByIdAndUpdate(
                    id,
                    { isBlocked: true },
                    { new: true }
                );
    
                if (!user) {
                    return res.status(404).json({
                        message: "Admin not found"
                    });
                }

                // Send professional email to frozen admin
                await EmailService(
                    user.email,
                    "Admin Account Suspended",
                    `<p>Dear ${user.username},</p>
                    <p>Your admin account has been suspended by the SuperAdmin.</p>
                    <p>You are temporarily unable to access your admin dashboard and perform admin functions.</p>
                    <p>For more information or to appeal this decision, please contact our support team.</p>
                    <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
                );
    
                return res.status(200).json({
                    message: "Admin account suspended successfully"
                });
    
            } catch (error) {
                console.error("freezeAdminError:", error.message);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    
        static async unfreezeAdmin(req, res) {
            try {
                const { id } = req.params;
                const user = await UserModel.findByIdAndUpdate(
                    id,
                    { isBlocked : false },
                    { new :  true }
                )
                if (!user) {
                    return res.status(404).json({
                        message: "Admin not found"
                    });
                }

                // Send professional email to unfrozen admin
                await EmailService(
                    user.email,
                    "Admin Account Reactivated",
                    `<p>Dear ${user.username},</p>
                    <p>Good news! Your admin account has been reactivated by the SuperAdmin.</p>
                    <p>You now have full access to your admin dashboard and can resume your administrative functions.</p>
                    <p>If you have any questions, please contact our support team.</p>
                    <p>Best regards,<br/>Project-IC SuperAdmin Team</p>`
                );

                return res.status(200).json({
                    message: "Admin account reactivated successfully"
                });
    
            } catch (error) {
                console.error("unfreezeAdminError:", error.message);
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
        }
    
}

module.exports = SuperadminController;

