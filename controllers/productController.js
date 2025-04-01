const Product = require("../models/Product");


// 📌 البحث والفلاتر
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, bestSeller, featured } = req.query;

    let filter = {};

    // 🔍 البحث بالاسم أو الوصف
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },  // بحث غير حساس لحالة الأحرف
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 🎯 تصفية حسب التصنيف
    if (category) {
      filter.category = category;
    }

    // 💰 تصفية حسب السعر
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // ⭐ تصفية المنتجات الأكثر مبيعًا
    if (bestSeller) {
      filter.isBestSeller = bestSeller === "true";
    }

    // 🎉 تصفية المنتجات المميزة
    if (featured) {
      filter.isFeatured = featured === "true";
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📌 جلب جميع المنتجات
const getallProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 جلب المنتجات الأكثر مبيعًا
const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ isBestSeller: true });
    res.json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 جلب المنتجات المميزة في البنر
const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📌 جلب بيانات منتج معين
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = { getProducts,getallProducts, getBestSellers, getFeaturedProducts,getOneProduct};
