// src/controllers/alertsController.js
const { v4: uuidv4 } = require("uuid");
const { alerts } = require("../data/store");

// GET /api/alerts — get all alerts
const getAllAlerts = (req, res) => {
  const { resolved } = req.query;

  let result = [...alerts];

  if (resolved !== undefined) {
    result = result.filter(
      (a) => a.resolved === (resolved === "true")
    );
  }

  res.status(200).json({ success: true, count: result.length, data: result });
};

// POST /api/alerts — create alert
const createAlert = (req, res) => {
  const { cropId, type, message } = req.body;

  if (!cropId || !message) {
    res.status(400);
    throw new Error("Fields 'cropId' and 'message' are required");
  }

  const newAlert = {
    id: uuidv4(),
    cropId,
    type: type ?? "info",
    message,
    resolved: false,
    createdAt: new Date().toISOString(),
  };

  alerts.push(newAlert);

  res.status(201).json({ success: true, data: newAlert });
};

// PATCH /api/alerts/:id/resolve — mark alert resolved
const resolveAlert = (req, res) => {
  const index = alerts.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error(`Alert with id '${req.params.id}' not found`);
  }

  alerts[index].resolved = true;

  res.status(200).json({ success: true, data: alerts[index] });
};

// DELETE /api/alerts/:id
const deleteAlert = (req, res) => {
  const index = alerts.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error(`Alert with id '${req.params.id}' not found`);
  }

  const deleted = alerts.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Alert deleted",
    data: deleted,
  });
};

module.exports = { getAllAlerts, createAlert, resolveAlert, deleteAlert };
