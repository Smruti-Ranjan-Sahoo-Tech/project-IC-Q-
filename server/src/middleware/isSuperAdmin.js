module.exports = (req, res, next) => {
  const token = req.cookies.superadmin;
  
  if (req.cookies.superadmin !== "true") {
    return res.redirect("/superadmin/login");
  }
  next();
};
