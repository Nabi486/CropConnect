// src/routes/ai.js
const express = require("express");
const router = express.Router();
const { getCropAdvice, analyseFarm, getIrrigationSchedule } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// All AI routes are protected — require JWT
router.use(protect);

// POST /api/ai/crop-advice     — ask a farming question
router.post("/crop-advice", getCropAdvice);

// POST /api/ai/analyse-farm    — analyse all crops
router.post("/analyse-farm", analyseFarm);

// POST /api/ai/irrigation      — get irrigation schedule
router.post("/irrigation", getIrrigationSchedule);

module.exports = router;
