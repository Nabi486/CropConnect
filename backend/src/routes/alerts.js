// src/routes/alerts.js
const express = require("express");
const router = express.Router();
const {
  getAllAlerts,
  createAlert,
  resolveAlert,
  deleteAlert,
} = require("../controllers/alertsController");

router.route("/").get(getAllAlerts).post(createAlert);
router.patch("/:id/resolve", resolveAlert);
router.delete("/:id", deleteAlert);

module.exports = router;
