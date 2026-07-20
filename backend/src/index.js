// src/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const connectDB = require("./config/db");

const { notFound, errorHandler } = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

// Routes
const authRouter = require("./routes/auth");
const cropsRouter = require("./routes/crops");
const aiRouter = require("./routes/ai");

// Connect MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= Middleware =================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ================= Routes =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Farm Hub API v3.0 🌱",
    endpoints: {
      auth: "/api/auth",
      crops: "/api/crops",
      ai: "/api/ai",
    },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/crops", apiLimiter, cropsRouter);
app.use("/api/ai", aiRouter);

// ================= Error Handlers =================

app.use(notFound);
app.use(errorHandler);

// ================= Start Server =================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});