const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 7000;
const MONGO_URI = "mongodb://localhost:27017/courseskill";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Add User
app.post("/signup", async (req, res) => {
    const { username, email, password, phone, city } = req.body;

    if (!username || !email || !password || !phone || !city) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newUser = new User({ username, email, password, phone, city });
        await newUser.save();

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login
app.post("/signin", async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email, and password are required" });
    }

    try {
        const user = await User.findOne({ username });
    
        if (user.email !== email) {
            return res.status(400).json({ error: "Invalid email for this username" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Forgot Password
app.post("/forgotpassword", async (req, res) => {
    const {email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Email, and new password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Server error" });
    }
});