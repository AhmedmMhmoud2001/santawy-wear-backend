const express = require("express");
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../controllers/cartController");


const { protect } = require("../middlewares/authMiddleware");


console.log("Protect Middleware:", protect); // ✅ تحقق من middleware
const router = express.Router();

// 📌 جلب سلة المستخدم
router.get("/", getCart);

// 📌 إضافة منتج للسلة
router.post("/",  addToCart);

// 📌 تعديل كمية منتج في السلة
router.put("/:productId",  updateCartItem);

// 📌 حذف منتج من السلة
router.delete("/:productId",  removeFromCart);

// 📌 تفريغ السلة بالكامل
router.delete("/",  clearCart);

module.exports = router;
