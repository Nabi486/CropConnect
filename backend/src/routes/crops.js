// src/routes/crops.js
const express = require("express");
const router = express.Router();
const {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  patchCrop,
  deleteCrop,
  searchCrops,
} = require("../controllers/cropsController");

// GET /api/crops/search  ← must be BEFORE /:id
router.get("/search", searchCrops);

// GET    /api/crops
// POST   /api/crops
router.route("/").get(getAllCrops).post(createCrop);

// GET    /api/crops/:id
// PUT    /api/crops/:id
// PATCH  /api/crops/:id
// DELETE /api/crops/:id
router
  .route("/:id")
  .get(getCropById)
  .put(updateCrop)
  .patch(patchCrop)
  .delete(deleteCrop);

module.exports = router;
