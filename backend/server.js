const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const { console } = require("inspector");
// const Course = require("./models/course");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/skill-courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection failed:", err));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  image: String,
});

const orderSchema = new mongoose.Schema({
  items: [{ title: String, level: String, price: Number, quantity: Number }],
  userName: String,
  userEmail: String,
  paymentMethod: { type: String, default: "COD" },
  subtotal: Number,
  billing: {
    email: String,
    phone: String,
  },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  type: String,
  subCategory: String,
  title: String,
  description: String,
  image: String,
  level: String,
  price: Number,
  status: String,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const bannerSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  status: Boolean,
}, { timestamps: true });


// Category Schema
const categorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  subCategory: { type: String, required: true }, // ✅ must be here
  status: { type: String, enum: ["enable", "disable"], default: "enable" },
});


// Models
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);
const Course = mongoose.model("Course", courseSchema);
const Banner = mongoose.model("Banner", bannerSchema);
const Category = mongoose.model("Category", categorySchema);


// ================= FRONTEND API =================

// Register
app.post("/api/register", upload.single("image"), async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const image = req.file?.filename || null;
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "Email or Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, mobile, password: hashed, image });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot Password
app.post("/api/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
});

// --- Orders ---
app.post("/api/orders/create", async (req, res) => {
  const { userEmail, userName, userType, items, subtotal, total } = req.body;
  if (!userEmail || !items?.length) {
    return res.status(400).json({ message: "Missing required order data" });
  }

  try {
    const newOrder = new Order({ userEmail, userName, userType, items, subtotal, total });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save order" });
  }
});
// Save (overwrite) all courses
app.put("/api/courses", async (req, res) => {
  try {
    await Course.deleteMany({}); // Remove old courses
    const result = await Course.insertMany(req.body); // Insert new ones
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});






// ================= ADMIN PANEL API =================
// ================= USERS =================


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.get("/api/user-image/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user?.image) {
      res.sendFile(path.join(__dirname, "uploads", user.image));
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving image" });
  }
});

// ================= ORDERS =================
app.post("/api/orders", async (req, res) => {
  const {
    items,
    userName,
    userEmail,
    paymentMethod = "COD",
    subtotal,
    billing,
  } = req.body;

  if (!userEmail || !items?.length) {
    return res.status(400).json({ message: "Missing required order data" });
  }

  try {
    const newOrder = new Order({
      items,
      userName,
      userEmail,
      paymentMethod,
      subtotal,
      billing,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Get Orders (search + pagination + sort)
app.get("/api/orders", async (req, res) => {
  const { search = "", page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;

  try {
    const query = {
      $or: [
        { userName: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
        { "items.title": { $regex: search, $options: "i" } },
        { "items.level": { $regex: search, $options: "i" } },
      ],
    };

    const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ orders, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Delete Order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
});
// ========== BANNER ==========

// Get all banners
app.get("/api/banner", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: "Error fetching banners" });
  }
});

// Create or update (first) banner
app.post("/api/banner", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const update = { title, description };
    if (req.file) update.image = `/uploads/${req.file.filename}`;

    const banner = new Banner(update);
    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: "Failed to add banner" });
  }
});

// Disable all banners
app.put("/api/banner/disableAll", async (req, res) => {
  try {
    await Banner.updateMany({}, { $set: { status: false } });
    res.json({ message: "All banners disabled" });
  } catch (err) {
    res.status(500).json({ error: "Failed to disable all banners" });
  }
});

// Update banner status by ID
app.put("/api/banner/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedBanner);
  } catch (err) {
    res.status(500).json({ error: "Failed to update banner status" });
  }
});
// DELETE /api/banner/:id
app.delete('/api/banner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Banner.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting banner:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE /api/banner
app.delete('/api/banner', async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: ["id1", "id2", ...] }

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No banner IDs provided" });
    }

    const result = await Banner.deleteMany({ _id: { $in: ids } });

    res.json({
      message: `${result.deletedCount} banners deleted successfully`,
    });
  } catch (err) {
    console.error("Bulk delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create Category
app.post("/api/categories", async (req, res) => {
  try {
    const { type, subCategory, status } = req.body;
    const newCategory = new Category({ type, subCategory, status });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add category", details: err.message });
  }
});

// Get Categories (with search)
app.get("/api/categories", async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = {
      $or: [
        { type: { $regex: search, $options: "i" } },
        { subCategory: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    };
    const categories = await Category.find(query);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Delete Category by ID
app.delete("/api/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});
app.put("/api/categories/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});


// Example route in Express
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find(); // Assuming a Mongoose model called Course
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
});
// app.get("/api/courses", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.post("/api/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  const id = req.params.id;
  // Find and update the course by id
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedCourse) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, course: updatedCourse });
});
// Delete single course by ID
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Optional: Bulk delete endpoint (if you want to do it in one request)
app.delete("/api/courses", async (req, res) => {
  try {
    const { ids } = req.body; 
    if (!Array.isArray(ids)) {
      return res.status(400).json({ success: false, message: "Invalid IDs array" });
    }
    const result = await Course.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
