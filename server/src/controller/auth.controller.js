const AdminAcessRequestModel = require("../models/AdminAccessRequest.model.js");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");
const EmailService = require("../config/email.config.js");

class AuthController {

    static async register(req, res) {
        try {
            const { username, email, password, role, phone, cource, passoutYear } = req.body;

            if (!username || !email || !password || !role || !phone || !cource) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const user = await UserModel.findOne({ email });
            if (user) {
                return res.status(409).json({ message: "User already registered" });
            }

            const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

            // ADMIN
            if (role === "admin") {
                const adminReqExist = await AdminAcessRequestModel.findOne({ email });
                if (adminReqExist) {
                    return res.status(409).json({ message: "Admin request already exists" });
                }

                const newAdminRequest = await AdminAcessRequestModel.create({ username, email,  hashPassword, role, phone, cource });

                // email to super admin
                await EmailService(  process.env.S_ADMIN_EMAIL, "New Admin Access Request",  `<p>New admin request received from <b>${username}</b> (${email})</p>`);

                // email to admin
                await EmailService(email,"Admin Request Submitted", `<p>Hello ${username},</p><p>Your admin account request is under verification.</p>`);

                return res.status(202).json({ message: "Your admin request is under review", newAdminRequest });
            }

            // USER
            if (!passoutYear) {
                return res.status(400).json({ message: "Passout year is required" });
            }
            await UserModel.create({ username, email,  hashPassword, role, phone, cource, passoutYear });
            
            // email to user
            await EmailService( email, "Registration Successful",
                `<p>Hello ${username},</p><p>Your account has been created successfully.</p>`  );

            return res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            console.log("registerControllerError:", error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Account not registered" });
            }
            const isMatch = await bcrypt.compare(password, user.hashPassword);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            console.log("user",user)

            //i want send all userdata but nnot hashPassword
            const token = generateToken(user);

            // email
            await EmailService(email, "Login Successful", `<h3>Hello ${user.username}</h3><p>You logged in successfully.</p>`);

            return res.status(200).json({ message: "Login successful", token, user });

        } catch (error) {
            console.log("LoginControllerError:",error.message)
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = AuthController;
