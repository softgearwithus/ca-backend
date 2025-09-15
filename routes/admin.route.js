import express from "express";
const router = express.Router();
import Consultation from "../model/consultation.model.js";

const ADMIN_PASSWORD = "secret123"; 

router.post("/verify", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: "Invalid password" });
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
