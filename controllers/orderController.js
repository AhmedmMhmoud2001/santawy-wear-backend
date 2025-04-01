const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 📌 إنشاء طلب جديد
const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    const newOrder = new Order({
      userId: req.user.id,
      items: cart.items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    await newOrder.save();

    // تفريغ السلة بعد إنشاء الطلب
    cart.items = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
};

// 📌 جلب جميع الطلبات الخاصة بالمستخدم
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

// 📌 جلب تفاصيل طلب واحد
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order" });
  }
};

// 📌 تحديث حالة الطلب (Admin فقط)
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};
const updateOrderPaymentStatus = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = "Paid"; // تحديث حالة الطلب بعد الدفع
      await order.save();
  
      res.json({ message: "Order payment successful", order });
    } catch (error) {
      res.status(500).json({ message: "Error updating order payment status" });
    }
  };

module.exports = { createOrder, getUserOrders, getOrderById, updateOrderStatus,updateOrderPaymentStatus };
