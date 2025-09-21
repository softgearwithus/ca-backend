import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    visitedBy: {
      type: String,
      enum: ["Youtube", "Facebook Page", "Google Search", "Linkedin", "Other"],
      required: true,
    },
    designation: {
      type: String,
      enum: [
        "Director/Founder/Business Owner",
        "CA/CS/CMA/Adv",
        "Investor/IEPF",
        "Student",
        "Other",
      ],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "Please share your problem in short",
    },
  },
  { timestamps: true }
);

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;
