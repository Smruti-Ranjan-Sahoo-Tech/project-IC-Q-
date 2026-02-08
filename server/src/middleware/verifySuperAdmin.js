const jwt = require("jsonwebtoken");

const verifySuperAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SERVER_SECREAT);
    
    req.user = decoded;
    const { role } = decoded;
    
    if (role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifySuperAdmin;
