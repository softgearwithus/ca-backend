import express from "express";
import dotenv from "dotenv";
import consultationsData from "./routes/formdata.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import adminRoutes from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import compliance from "./routes/compliance.route.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","https://www.mycsonline.in","https://ca-two-orpin.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("backend running.");
});

app.use("/api/consultations", consultationsData);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/compliance",compliance);

connectDB();

export default app
