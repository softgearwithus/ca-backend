// models/Compliance.js
import mongoose from "mongoose";

const complianceUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // You can also use Date type
});

const newsletterSchema = new mongoose.Schema({
  month: { type: String, required: true },
  driveLink: { type: String }, // ✅ should work
}, { timestamps: true });


const complianceEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  due: { type: Date, required: true },
});

export const ComplianceUpdate = mongoose.model("ComplianceUpdate", complianceUpdateSchema);
export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
export const ComplianceEvent = mongoose.model("ComplianceEvent", complianceEventSchema);
