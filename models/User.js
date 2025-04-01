const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String ,default: "no address"},
  phone: { type: Number ,default: "0123456789" },
  image: { type: String,default: "no img" },
  // isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" } // ✅ إضافة دور المستخدم
});

module.exports = mongoose.model("User", userSchema);
