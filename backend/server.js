// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/courseskill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// ── NEW: Order Schema ───────────────────────────────────
const orderSchema = new mongoose.Schema({
  billing: {
    firstName:   String,
    lastName:    String,
    company:     String,
    address1:    String,
    address2:    String,
    city:        String,
    state:       String,
    zip:         String,
    phone:       String,
    email:       String,
    notes:       String,
  },
  items: [
    {
      title:    String,
      level:    String,
      price:    Number,
      quantity: Number,
    }
  ],
  subtotal: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);
// Sign Up
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashed });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Sign In
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password!" });

    res.json({ message: "Login successful!" });
  } catch {
    res.status(500).json({ message: "Login error" });
  }
});

// ── NEW: Create Order ────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order placed successfully!', orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error placing order' });
  }
});
// ─────────────────────────────────────────────────────────

app.listen(5000, () => {
  console.log("Server running on port 5000");
});