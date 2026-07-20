// src/models/Crop.js
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Crop name is required"], trim: true },
    field: { type: String, required: [true, "Field name is required"], trim: true },
    stage: {
      type: String,
      required: true,
      enum: ["Seedling", "Vegetative", "Flowering", "Fruiting", "Ripening", "Harvesting"],
    },
    health: { type: Number, min: 0, max: 100, default: 100 },
    soilMoisture: { type: Number, min: 0, max: 100, default: 70 },
    temperature: { type: Number, default: 25 },
    lastWatered: { type: Date, default: Date.now },
    notes: { type: String, default: "", trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
