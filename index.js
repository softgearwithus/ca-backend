import express from "express";
import dotenv from "dotenv";
import consultationsData from "./routes/formdata.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import adminRoutes from "./routes/admin.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ca-two-orpin.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend running.");
});

app.use("/api/consultations", consultationsData);
app.use("/api/admin", adminRoutes);

// DB connection
connectDB();

export default app
