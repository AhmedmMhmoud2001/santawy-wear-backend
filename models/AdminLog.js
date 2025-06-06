const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    details: { type: Object }, // معلومات إضافية عن العملية
    timestamp: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model("AdminLog", adminLogSchema);
