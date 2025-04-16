const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const Feedback = require("./models/Feedback");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/signindb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Models
const modelMap = {
  Frontend: {
    Beginner: require("./models/FrontendBeginner"),
    Intermediate: require("./models/FrontendIntermediate"),
    Advanced: require("./models/FrontendAdvanced"),
  },
  Backend: {
    Beginner: require("./models/BackendBeginner"),
    Intermediate: require("./models/BackendIntermediate"),
    Advanced: require("./models/BackendAdvanced"),
  },
  UIUX: {
    Beginner: require("./models/UIUXBeginner"),
    Intermediate: require("./models/UIUXIntermediate"),
    Advanced: require("./models/UIUXAdvanced"),
  },
};

// Utility to save users to a file
function saveUserToFile(userData, file = "users.json") {
  const filePath = path.join(__dirname, file);
  let users = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    users = JSON.parse(data);
  }

  users.push(userData);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// ✅ SIGN UP ROUTE
app.post("/api/signup", async (req, res) => {
  const { username, email, mobile, password, level, courseType } = req.body;

  try {
    const UserModel = modelMap[courseType]?.[level];
    if (!UserModel) {
      return res.status(400).json({ error: "Invalid course type or level" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      mobile,
      password: hashedPassword,
      level,
      courseType,
    });

    await newUser.save();

    saveUserToFile(
      { username, email, mobile, level, courseType, createdAt: new Date() },
      `${courseType}_${level}_users.json`
    );

    res.status(201).json({ message: `${courseType} ${level} user registered successfully` });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// ✅ LOGIN ROUTE
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    for (const courseType in modelMap) {
      for (const level in modelMap[courseType]) {
        const UserModel = modelMap[courseType][level];
        const user = await UserModel.findOne({ email });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return res.status(200).json({ message: "Login successful" });
          } else {
            return res.status(401).json({ message: "Invalid password" });
          }
        }
      }
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ FORGOT PASSWORD ROUTE
app.post("/api/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    let userFound = false;

    for (const courseType in modelMap) {
      for (const level in modelMap[courseType]) {
        const UserModel = modelMap[courseType][level];
        const user = await UserModel.findOne({ email });

        if (user) {
          user.password = hashedPassword;
          await user.save();
          userFound = true;
          return res.status(200).json({ message: "Password updated successfully" });
        }
      }
    }

    if (!userFound) {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Password reset error:", err.message);
    res.status(500).json({ message: "Password reset failed", error: err.message });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newFeedback = new Feedback({ name, email, subject, message });
    await newFeedback.save();

    // Optional: Save to a local file as well
    const feedbackData = { name, email, subject, message, date: new Date() };
    const filePath = path.join(__dirname, "feedback.json");

    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath));
    }
    existing.push(feedbackData);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(201).json({ message: "Feedback received successfully!" });
  } catch (error) {
    console.error("Feedback error:", error.message);
    res.status(500).json({ message: "Failed to submit feedback", error: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
