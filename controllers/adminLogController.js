const AdminLog = require("../models/AdminLog");

// 📌 عرض جميع سجلات العمليات
const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find().populate("admin", "name email");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminLogs };
