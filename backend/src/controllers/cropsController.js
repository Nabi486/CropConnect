// src/controllers/cropsController.js
const Crop = require("../models/Crop");
const asyncHandler = require("../middleware/asyncHandler");

// GET /api/crops
const getAllCrops = asyncHandler(async (req, res) => {
  const { search, field, stage } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };
  if (field) filter.field = { $regex: field, $options: "i" };
  if (stage) filter.stage = stage;

  const crops = await Crop.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: crops.length, data: crops });
});

// GET /api/crops/search
const searchCrops = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400);
    throw new Error("Query parameter 'q' is required");
  }
  const crops = await Crop.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { field: { $regex: q, $options: "i" } },
      { stage: { $regex: q, $options: "i" } },
    ],
  });
  res.status(200).json({ success: true, query: q, count: crops.length, data: crops });
});

// GET /api/crops/:id
const getCropById = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) {
    res.status(404);
    throw new Error(`Crop not found with id: ${req.params.id}`);
  }
  res.status(200).json({ success: true, data: crop });
});

// POST /api/crops
const createCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.create(req.body);
  res.status(201).json({ success: true, data: crop });
});

// PUT /api/crops/:id
const updateCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!crop) {
    res.status(404);
    throw new Error(`Crop not found with id: ${req.params.id}`);
  }
  res.status(200).json({ success: true, data: crop });
});

// PATCH /api/crops/:id
const patchCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!crop) {
    res.status(404);
    throw new Error(`Crop not found with id: ${req.params.id}`);
  }
  res.status(200).json({ success: true, data: crop });
});

// DELETE /api/crops/:id
const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findByIdAndDelete(req.params.id);
  if (!crop) {
    res.status(404);
    throw new Error(`Crop not found with id: ${req.params.id}`);
  }
  res.status(200).json({
    success: true,
    message: `Crop '${crop.name}' deleted successfully`,
    data: crop,
  });
});

module.exports = {
  getAllCrops,
  searchCrops,
  getCropById,
  createCrop,
  updateCrop,
  patchCrop,
  deleteCrop,
};
