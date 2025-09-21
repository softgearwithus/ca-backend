import express from "express";
import { ComplianceUpdate, Newsletter, ComplianceEvent } from "../model/compliance.model.js"

const router = express.Router();

/* -------------------------------
   📌 Compliance Updates (POST + GET)
--------------------------------- */
router.post("/update", async (req, res) => {
  try {
    const update = new ComplianceUpdate(req.body);
    await update.save();
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/update", async (req, res) => {
  try {
    const updates = await ComplianceUpdate.find().sort({ _id: -1 });
    res.json({ success: true, data: updates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/update/:id", async (req, res) => {
  try {
    await ComplianceUpdate.findByIdAndDelete(req.params.id);
    res.json({ message: "Update deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------
   📌 Newsletters (POST + GET)
--------------------------------- */
router.post("/newsletter", async (req, res) => {
  console.log("Received body:", req.body); // check this in terminal
  const { month, driveLink } = req.body;
  if (!month) return res.status(400).json({ error: "Month required" });

  const newsletter = new Newsletter({ month, driveLink });
  await newsletter.save();
  res.status(201).json(newsletter);
});



router.get("/newsletter", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ _id: -1 });
    res.json({ success: true, data: newsletters });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/newsletter/:id", async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Newsletter deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------
   📌 Compliance Events (POST + GET)
--------------------------------- */
router.post("/event", async (req, res) => {
  try {
    const event = new ComplianceEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/event", async (req, res) => {
  try {
    const events = await ComplianceEvent.find().sort({ due: 1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/event/:id", async (req, res) => {
  try {
    await ComplianceEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
