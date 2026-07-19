// src/models/Crop.js
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Crop name is required"],
      trim: true,
    },
    field: {
      type: String,
      required: [true, "Field name is required"],
      trim: true,
    },
    stage: {
      type: String,
      required: [true, "Growth stage is required"],
      enum: ["Seedling", "Vegetative", "Flowering", "Fruiting", "Ripening", "Harvesting"],
    },
    health: {
      type: Number,
      min: 0,
      max: 100,
      default: 100,
    },
    soilMoisture: {
      type: Number,
      min: 0,
      max: 100,
      default: 70,
    },
    temperature: {
      type: Number,
      default: 25,
    },
    lastWatered: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Crop", cropSchema);
