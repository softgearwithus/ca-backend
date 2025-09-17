// models/Download.js
import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    companyAct: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    mbp: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt automatically
);

const Download = mongoose.model("Download", downloadSchema);

export default Download;
