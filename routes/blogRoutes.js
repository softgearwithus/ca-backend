import express from "express";
import multer from "multer";
import cloudinary from "../lib/upload.js";
import Blog from "../model/Blog.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST a blog
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    let imageUrl = null;

    if (req.file) {
      // Upload buffer to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "blogs" },
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );

      // Alternative using Promises:
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newBlog = new Blog({
      title,
      content,
      image: imageUrl,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    console.error("Blog upload error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
