const express = require("express");
const { createOrder, getUserOrders, getOrderById, updateOrderStatus,updateOrderPaymentStatus } = require("../controllers/orderController");
const {protect,adminOnly} = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 إنشاء طلب جديد
router.post("/", protect, createOrder);

// 📌 جلب جميع الطلبات الخاصة بالمستخدم
router.get("/", protect, getUserOrders);

// 📌 جلب تفاصيل طلب واحد
router.get("/:orderId", protect, getOrderById);

// 📌 تحديث orderRoutes.js لإضافة مسار تحديث حالة الدفع:
router.put("/:orderId/pay", protect, updateOrderPaymentStatus);

module.exports = router;
