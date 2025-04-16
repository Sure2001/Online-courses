const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  level: String,
  courseType: String,
}, { timestamps: true });

module.exports = mongoose.model("UIUXBeginner", userSchema);
