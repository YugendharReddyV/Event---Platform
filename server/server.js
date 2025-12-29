import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ⭐ Allow both localhost and Render frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL // Render frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// ⭐ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ⭐ IMPORTANT: Use Render's port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
