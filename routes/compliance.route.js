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
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  try {
    const newsletter = new Newsletter(req.body);
    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/newsletter", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ _id: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const events = await ComplianceEvent.find().sort({ due: 1 }); // sort by due date
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
