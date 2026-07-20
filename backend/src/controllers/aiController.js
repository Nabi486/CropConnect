// src/controllers/aiController.js
const { asyncHandler } = require("../middleware/errorHandler");

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

// POST /api/ai/crop-advice
const getCropAdvice = asyncHandler(async (req, res) => {
  const { question, cropName, field, stage, health, soilMoisture, temperature } = req.body;

  if (!question || question.trim().length < 3) {
    res.status(400);
    throw new Error("Please provide a valid question.");
  }

  const systemPrompt = `You are an expert AI agricultural advisor for Smart Farm Hub, an AI-powered farm management platform. 
You help farmers with crop management, soil health, irrigation, pest control, and yield optimization.
Always give practical, actionable advice. Keep responses clear and under 200 words.
Format your response with clear sections when needed.`;

  const userMessage = cropName
    ? `Crop: ${cropName} | Field: ${field} | Stage: ${stage} | Health: ${health}% | Soil Moisture: ${soilMoisture}% | Temperature: ${temperature}°C\n\nFarmer's Question: ${question}`
    : question;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    res.status(502);
    throw new Error(err.error?.message || "AI service error");
  }

  const data = await response.json();
  const aiText = data.content[0]?.text || "No response generated.";

  res.status(200).json({
    success: true,
    question: question,
    answer: aiText,
    model: data.model,
    usage: data.usage,
  });
});

// POST /api/ai/analyse-farm
const analyseFarm = asyncHandler(async (req, res) => {
  const { crops } = req.body;

  if (!crops || crops.length === 0) {
    res.status(400);
    throw new Error("No crop data provided for analysis.");
  }

  const cropSummary = crops
    .map((c) => `- ${c.name} (${c.field}): Stage=${c.stage}, Health=${c.health}%, Moisture=${c.soilMoisture}%`)
    .join("\n");

  const prompt = `Analyse this farm data and give a brief overall health summary with top 2 recommendations:\n\n${cropSummary}`;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: "You are an expert farm management AI. Give concise, practical farm analysis.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    res.status(502);
    throw new Error("AI service error. Please try again.");
  }

  const data = await response.json();
  res.status(200).json({
    success: true,
    analysis: data.content[0]?.text || "No analysis generated.",
  });
});

// POST /api/ai/irrigation-schedule
const getIrrigationSchedule = asyncHandler(async (req, res) => {
  const { cropName, soilMoisture, temperature, stage, weather } = req.body;

  if (!cropName) {
    res.status(400);
    throw new Error("Crop name is required.");
  }

  const prompt = `Create a simple 3-day irrigation schedule for:
Crop: ${cropName}
Growth Stage: ${stage}
Current Soil Moisture: ${soilMoisture}%
Temperature: ${temperature}°C
Weather: ${weather || "Clear"}

Give day-by-day recommendations with water amounts.`;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 350,
      system: "You are an irrigation expert. Give practical water management advice for farmers.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    res.status(502);
    throw new Error("AI service error. Please try again.");
  }

  const data = await response.json();
  res.status(200).json({
    success: true,
    schedule: data.content[0]?.text || "No schedule generated.",
  });
});

module.exports = { getCropAdvice, analyseFarm, getIrrigationSchedule };
