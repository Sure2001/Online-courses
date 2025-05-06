const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");

// --- MongoDB Connection ---
mongoose.connect("mongodb://127.0.0.1:27017/skill-courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// --- Schemas & Models ---
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobile: String,
  password: String,
  image: String,
});

const orderSchema = new mongoose.Schema({
  userEmail: String,
  userName: String,
  userType: String, // Optional field
  items: Array,
  subtotal: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

// --- Multer Setup for File Upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// --- Express App Setup ---
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---

// User Registration
app.post("/api/register", upload.single("image"), async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    const image = req.file?.filename || null;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
      image,
    });

    await newUser.save();
    res.status(200).json({ message: "Registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ user }); // No token returned
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// User Validation
app.post("/api/users/validate", async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Order Creation
app.post("/api/orders/create", async (req, res) => {
  try {
    const { userEmail, userName, items, subtotal, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items in the order." });
    }

    const newOrder = new Order({
      userEmail,
      userName,
      items,
      subtotal,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Failed to place order." });
  }
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
