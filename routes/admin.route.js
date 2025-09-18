import express from "express";
const router = express.Router();
import Consultation from "../model/consultation.model.js";
import Download from "../model/download.js"
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

const ADMINS = [
  { email: "admin@example.com", password: "admin123" },
  { email: "super@example.com", password: "super123" },
  { email: "cssandeeprajbhar@gmail.com",password:"sandeep@903"}
];

router.post("/verify", (req, res) => {
  const { email, password } = req.body;

  const admin = ADMINS.find(
    (user) => user.email === email && user.password === password
  );

  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,   
    secure: false,    
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, 
  });

  return res.json({ success: true, message: "Login successful" });
});

router.get("/count", async (req, res) => {
  try {
    const count = await Consultation.countDocuments();
    res.json({ success: true, total: count });
  } catch (err) {
    console.error("Error counting consultations:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /download
router.post("/download", async (req, res) => {
  try {
    const { companyAct, section, mbp, fileUrl } = req.body;

    if (!companyAct || !section || !mbp || !fileUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDownload = await Download.create({
      companyAct,
      section,
      mbp,
      fileUrl,
    });

    return res.status(201).json({
      message: "Download entry created successfully",
      data: newDownload,
    });
  } catch (error) {
    console.error("Error creating download:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET all downloads
router.get("/download", async (req, res) => {
  try {
    const downloads = await Download.find();
    res.status(200).json(downloads);
  } catch (error) {
    console.error("Error fetching downloads:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a download by ID
router.delete("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Download.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Download not found" });
    }

    return res.status(200).json({ message: "Download deleted successfully" });
  } catch (error) {
    console.error("Error deleting download:", error);
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
