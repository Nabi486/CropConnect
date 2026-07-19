// src/models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: [true, "cropId is required"],
    },
    type: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info",
    },
    message: {
      type: String,
      required: [true, "Alert message is required"],
      trim: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Alert", alertSchema);
