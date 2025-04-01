const express = require("express");
const { registerUser, loginUser, getUserProfile,updateProfile,logoutUser } = require("../controllers/userController");
const { protect} = require("../middlewares/authMiddleware");
const router = express.Router();

// 📌 تسجيل مستخدم جديد
router.post("/register", registerUser);

// 📌 تسجيل الدخول
router.post("/login", loginUser);

// 📌 جلب بيانات المستخدم المحمي (يتطلب تسجيل الدخول)
router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateProfile);

// ✅ تسجيل خروج المستخدم
router.post("/logout", logoutUser);


module.exports = router;
