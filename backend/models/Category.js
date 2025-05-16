// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   categoryType: { type: String, required: true },
//   subcategory: { type: [String], required: true },
//   status: { type: String, default: 'Active' }
// }, { timestamps: true });

// module.exports = mongoose.model('Category', categorySchema);
const categorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  subCategory: { type: String, required: true }, // ✅ must be here
  status: { type: String, enum: ["enable", "disable"], default: "enable" },
});



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