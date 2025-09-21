// routes/formdata.route.js
import express from "express";
import Consultation from "../model/consultation.model.js";

const router = express.Router();

// POST /api/consultations
// ✅ Create a new consultation
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, visitedBy, designation, address, message } =
      req.body;

    // Basic validation
    if (!name || !email || !phone || !visitedBy || !designation || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    const consultation = new Consultation({
      name,
      email,
      phone,
      visitedBy,
      designation,
      address,
      message,
    });

    await consultation.save();

    res.json({
      success: true,
      message: "Consultation saved successfully!",
      data: consultation,
    });
  } catch (err) {
    console.error("❌ Error saving consultation:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: consultations });
  } catch (err) {
    console.error("Error fetching consultations:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
