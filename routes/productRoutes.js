const express = require("express");
const { getProducts,getallProducts, getBestSellers, getFeaturedProducts ,getOneProduct} = require("../controllers/productController");

const router = express.Router();

// 📌 جلب كل المنتجات
router.get("/", getProducts);
// 📌 جلب كل المنتجات
router.get("/allProducts", getallProducts);

// 📌 جلب المنتجات الأكثر مبيعًا
router.get("/bestsellers", getBestSellers);

// 📌 جلب المنتجات المميزة في البنر
router.get("/featured", getFeaturedProducts);
// 📌 جلب منتج معين 
router.get("/:id", getOneProduct);


module.exports = router;
