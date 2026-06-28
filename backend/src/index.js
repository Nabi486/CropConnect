// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const cropsRouter = require("./routes/crops");
const alertsRouter = require("./routes/alerts");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(logger);

// ── Routes ──────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Farm Hub API is running 🌱",
    version: "1.0.0",
    endpoints: {
      crops: "/api/crops",
      cropSearch: "/api/crops/search?q=wheat",
      alerts: "/api/alerts",
    },
  });
});

app.use("/api/crops", cropsRouter);
app.use("/api/alerts", alertsRouter);

// ── Error Handling ──────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});
