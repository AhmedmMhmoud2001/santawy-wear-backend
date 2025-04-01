const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const logAdminAction = require("../utils/logAdminAction");

// 📊 جلب إحصائيات لوحة التحكم
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin stats" });
  }
};

// 📌 جلب جميع المستخدمين (Admins فقط)
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };
  // 📌 ترقية مستخدم إلى أدمن (Admin فقط)
  const makeAdmin = async (req, res) => {
      try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        user.role = "admin";
        await user.save();
        res.json({ message: `User ${user.name} is now an admin` });
      } catch (error) {
        res.status(500).json({ message: "Error updating user role" });
      }
    }; 
  // 📌 حذف مستخدم (Admins فقط)
  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  };
  // 📌 إضافة منتج جديد
  const addProduct = async (req, res) => {
    const { name, price, description, image, category, stock, isBestSeller, isFeatured } = req.body;
  
    try {
      const newProduct = new Product({ name, price, description, image, category, stock, isBestSeller, isFeatured });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  // 📌 جلب جميع الطلبات (Admins فقط)
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("userId", "name email").populate("items.productId", "name price");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  };
  
  // 📌 تحديث حالة الطلب (Admins فقط)
  const updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = req.body.status;
      await order.save();
      res.json({ message: `Order status updated to ${order.status}` });
    } catch (error) {
      res.status(500).json({ message: "Error updating order status" });
    }
  };
  



// 📌 حذف جميع المستخدمين
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    await logAdminAction(req.user.id, "Deleted all users", {});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 تعديل منتج
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await logAdminAction(req.user.id, "Updated product", { productId: product._id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 حذف منتج معين
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    await logAdminAction(req.user.id, "Deleted product", { productId: req.params.id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 حذف جميع المنتجات
const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    await logAdminAction(req.user.id, "Deleted all products", {});
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getAdminStats, getAllUsers,makeAdmin, deleteUser,addProduct , getAllOrders, updateOrderStatus ,deleteAllUsers, updateProduct, deleteProduct, deleteAllProducts };
  
  
