const Cart = require("../models/Cart");
console.log("Cart Controller Loaded!");

// 📌 جلب سلة المستخدم
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart" });
  }
};

// 📌 إضافة منتج للسلة
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

// 📌 تعديل كمية منتج في السلة
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.json(cart);
    }

    res.status(404).json({ message: "Item not found in cart" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// 📌 حذف منتج من السلة
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

// 📌 تفريغ السلة بالكامل
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
