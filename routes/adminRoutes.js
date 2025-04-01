const express = require("express");
const { getAdminStats,getAllUsers,makeAdmin,deleteUser,deleteAllUsers,addProduct,updateProduct,deleteProduct,deleteAllProducts,getAllOrders,updateOrderStatus } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getAdminLogs } = require("../controllers/adminLogController");
const router = express.Router();


// 📊 جلب إحصائيات لوحة التحكم
router.get("/stats", protect, adminOnly, getAdminStats);

// 📌 جلب جميع المستخدمين
router.get("/users", protect, adminOnly, getAllUsers);
// 📌 ترقية مستخدم إلى أدمن (Admins فقط)
router.put("/make-admin/:userId", protect, adminOnly, makeAdmin);

// 📌 حذف مستخدم
router.delete("/users/:userId", protect, adminOnly, deleteUser);
// ✅ حذف جميع المستخدمين (صلاحيات الأدمن)
router.delete("/users", protect, adminOnly, deleteAllUsers);




// 📌 إضافة منتج جديد
router.post("/addproduct",protect, adminOnly, addProduct);

// ✅ تعديل منتج
router.put("/products/:id", protect,adminOnly, updateProduct);

// ✅ حذف منتج معين
router.delete("/products/:id", protect, adminOnly, deleteProduct);

// ✅ حذف جميع المنتجات
router.delete("/products", protect, adminOnly, deleteAllProducts);





router.get("/orders", protect, adminOnly, getAllOrders);

// 📌 تحديث حالة الطلب
router.put("/orders/:orderId", protect, adminOnly, updateOrderStatus);


// ✅ جلب جميع السجلات
router.get("/logs", protect, adminOnly, getAdminLogs);





module.exports = router;
