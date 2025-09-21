import express from "express";
import Blog from "../model/Blog.js"
import upload from "../lib/upload.js";

const router = express.Router();

// CREATE blog (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const image = req.file?.path || null;
    const blog = new Blog({ title, content, image });
    const savedBlog = await blog.save();

    res.status(201).json({ success: true, data: savedBlog });
  } catch (err) {
    console.error("Blog upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});



// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE blog (with optional new image)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateData = { title, content };

    if (req.file) {
      updateData.image = req.file.path; // new Cloudinary URL
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
