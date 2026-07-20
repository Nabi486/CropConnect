// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const authRouter = require("./routes/auth");
const cropsRouter = require("./routes/crops");

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Routes ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Farm Hub API v3.0 🌱",
    endpoints: {
      auth: "/api/auth",
      crops: "/api/crops (protected — requires JWT)",
    },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/crops", apiLimiter, cropsRouter);

// ── Error Handling ──────────────────────────────────
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
