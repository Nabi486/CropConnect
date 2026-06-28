// src/controllers/cropsController.js
const { v4: uuidv4 } = require("uuid");
const { crops } = require("../data/store");

// GET /api/crops — get all crops (with optional search & filter)
const getAllCrops = (req, res) => {
  const { search, field, stage } = req.query;

  let result = [...crops];

  if (search) {
    result = result.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (field) {
    result = result.filter(
      (c) => c.field.toLowerCase() === field.toLowerCase()
    );
  }

  if (stage) {
    result = result.filter(
      (c) => c.stage.toLowerCase() === stage.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
};

// GET /api/crops/:id — get single crop
const getCropById = (req, res) => {
  const crop = crops.find((c) => c.id === req.params.id);

  if (!crop) {
    res.status(404);
    throw new Error(`Crop with id '${req.params.id}' not found`);
  }

  res.status(200).json({ success: true, data: crop });
};

// POST /api/crops — create new crop
const createCrop = (req, res) => {
  const { name, field, stage, health, soilMoisture, temperature, notes } =
    req.body;

  if (!name || !field || !stage) {
    res.status(400);
    throw new Error("Fields 'name', 'field', and 'stage' are required");
  }

  const newCrop = {
    id: uuidv4(),
    name,
    field,
    stage,
    health: health ?? 100,
    soilMoisture: soilMoisture ?? 70,
    temperature: temperature ?? 25,
    lastWatered: new Date().toISOString(),
    notes: notes ?? "",
  };

  crops.push(newCrop);

  res.status(201).json({ success: true, data: newCrop });
};

// PUT /api/crops/:id — update crop (full replace)
const updateCrop = (req, res) => {
  const index = crops.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error(`Crop with id '${req.params.id}' not found`);
  }

  const { name, field, stage, health, soilMoisture, temperature, notes } =
    req.body;

  if (!name || !field || !stage) {
    res.status(400);
    throw new Error("Fields 'name', 'field', and 'stage' are required");
  }

  crops[index] = {
    ...crops[index],
    name,
    field,
    stage,
    health: health ?? crops[index].health,
    soilMoisture: soilMoisture ?? crops[index].soilMoisture,
    temperature: temperature ?? crops[index].temperature,
    notes: notes ?? crops[index].notes,
  };

  res.status(200).json({ success: true, data: crops[index] });
};

// PATCH /api/crops/:id — partial update
const patchCrop = (req, res) => {
  const index = crops.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error(`Crop with id '${req.params.id}' not found`);
  }

  crops[index] = { ...crops[index], ...req.body };

  res.status(200).json({ success: true, data: crops[index] });
};

// DELETE /api/crops/:id — delete crop
const deleteCrop = (req, res) => {
  const index = crops.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error(`Crop with id '${req.params.id}' not found`);
  }

  const deleted = crops.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Crop '${deleted.name}' deleted successfully`,
    data: deleted,
  });
};

// GET /api/crops/search — search crops by name
const searchCrops = (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400);
    throw new Error("Query parameter 'q' is required");
  }

  const results = crops.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.field.toLowerCase().includes(q.toLowerCase()) ||
    c.stage.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json({
    success: true,
    query: q,
    count: results.length,
    data: results,
  });
};

module.exports = {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  patchCrop,
  deleteCrop,
  searchCrops,
};
