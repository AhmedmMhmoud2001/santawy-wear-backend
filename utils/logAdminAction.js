const AdminLog = require("../models/AdminLog");

const logAdminAction = async (adminId, action, details) => {
  try {
    await AdminLog.create({ admin: adminId, action, details });
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
};

module.exports = logAdminAction;
