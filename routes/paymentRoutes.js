const express = require("express");
const { createPaymentOrder } = require("../config/paymob");
const router = express.Router();

router.post("/pay", async (req, res) => {
  try {
    const { amount, currency, email } = req.body;
    const payment = await createPaymentOrder(amount, currency, email);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

module.exports = router;

