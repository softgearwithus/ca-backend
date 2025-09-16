import express from "express";
const router = express.Router();
import Consultation from "../model/consultation.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

const ADMINS = [
  { email: "admin@example.com", password: "admin123" },
  { email: "super@example.com", password: "super123" }
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

export default router;
