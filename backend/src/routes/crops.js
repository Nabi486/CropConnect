// src/routes/crops.js
const express = require("express");
const router = express.Router();
const {
  getAllCrops, searchCrops, getCropById,
  createCrop, updateCrop, patchCrop, deleteCrop,
} = require("../controllers/cropsController");
const { protect } = require("../middleware/authMiddleware");

// All crop routes are protected — require JWT
router.use(protect);

router.get("/search", searchCrops);
router.route("/").get(getAllCrops).post(createCrop);
router.route("/:id").get(getCropById).put(updateCrop).patch(patchCrop).delete(deleteCrop);

module.exports = router;
