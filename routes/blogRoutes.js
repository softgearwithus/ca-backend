import cors from "cors";
import express from "express";
import multer from "multer";
import cloudinary from "../lib/upload.js";
import Blog from "../model/Blog.js";

const router = express.Router();

// Add CORS middleware here
router.use(cors({
  origin: ["https://www.mycsonline.in", "https://ca-two-orpin.vercel.app"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle preflight request (OPTIONS)
router.options("/", (req, res) => {
  res.sendStatus(200);
});

// POST a blog
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });

    let imageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "blogs" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const newBlog = await Blog.create({ title, content, image: imageUrl });
    res.status(201).json({ success: true, data: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
