// src/controllers/alertsController.js
const Alert = require("../models/Alert");
const asyncHandler = require("../middleware/asyncHandler");

// GET /api/alerts
const getAllAlerts = asyncHandler(async (req, res) => {
  const { resolved } = req.query;
  const filter = {};
  if (resolved !== undefined) filter.resolved = resolved === "true";

  const alerts = await Alert.find(filter)
    .populate("cropId", "name field")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: alerts.length, data: alerts });
});

// POST /api/alerts
const createAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json({ success: true, data: alert });
});

// PATCH /api/alerts/:id/resolve
const resolveAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { resolved: true },
    { new: true }
  );
  if (!alert) {
    res.status(404);
    throw new Error(`Alert not found with id: ${req.params.id}`);
  }
  res.status(200).json({ success: true, data: alert });
});

// DELETE /api/alerts/:id
const deleteAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) {
    res.status(404);
    throw new Error(`Alert not found with id: ${req.params.id}`);
  }
  res.status(200).json({ success: true, message: "Alert deleted", data: alert });
});

module.exports = { getAllAlerts, createAlert, resolveAlert, deleteAlert };
