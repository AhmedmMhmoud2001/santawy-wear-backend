const axios = require("axios");
require("dotenv").config();

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;

const getAuthToken = async () => {
  const response = await axios.post("https://accept.paymob.com/api/auth/tokens", {
    api_key: PAYMOB_API_KEY,
  });
  return response.data.token;
};

const createPaymentOrder = async (amount, currency, customerEmail) => {
  const token = await getAuthToken();

  const orderData = {
    auth_token: token,
    delivery_needed: false,
    amount_cents: amount * 100, // Convert to cents
    currency: currency,
    merchant_order_id: Math.floor(Math.random() * 1000000), // Unique order ID
    items: [],
  };

  const orderResponse = await axios.post(
    "https://accept.paymob.com/api/ecommerce/orders",
    orderData
  );

  return orderResponse.data;
};

module.exports = { createPaymentOrder };
