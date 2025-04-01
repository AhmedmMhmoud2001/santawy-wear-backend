const jwt = require("jsonwebtoken");
const User = require("../models/User");
// 📌 التحقق من التوكن
// const protect = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token || !token.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized - No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//     req.user = decoded; // إضافة بيانات المستخدم إلى الطلب
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
const protect = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
  
      if (!req.user) return res.status(401).json({ message: "Unauthorized - User not found" });
  
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
// 📌 التحقق من صلاحيات الأدمن
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied - Admins only" });
    }
  };
  
module.exports = {protect,adminOnly};
