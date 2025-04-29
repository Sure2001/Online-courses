// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/courseskill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// User Schema with image
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});
const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  billing: {
    firstName: String,
    lastName: String,
    company: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    email: String,
    notes: String,
  },
  items: [
    {
      title: String,
      level: String,
      price: Number,
      quantity: Number,
    }
  ],
  subtotal: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// ── Sign Up ───────────────────────────────────────────────
app.post('/api/signup', upload.single("image"), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashed,
      image: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      } : undefined
    });

    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// ── Sign In ───────────────────────────────────────────────
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

// ── Forgot Password ───────────────────────────────────────
app.post('/api/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with that email." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// ── Get All Orders with Pagination & Search ─────────────────────────
app.get('/api/orders', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  try {
    const query = search
      ? { 'billing.email': { $regex: search, $options: 'i' } }
      : {};

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


app.delete('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Delete order error:', err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

// ── Optional: Get user image ───────────────────────────────
app.get('/api/user-image/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user?.image?.data) {
      res.set('Content-Type', user.image.contentType);
      return res.send(user.image.data);
    }
    res.status(404).json({ message: "Image not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving image" });
  }
});


// ── Get All Users ───────────────────────────────────────────────
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ── Delete User ───────────────────────────────────────────────
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});


// ── Start Server ───────────────────────────────────────────
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
