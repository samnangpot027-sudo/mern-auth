import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongo connecting");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json({ limit: "10mb" }));

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

// route api
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoute);

// middlware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
