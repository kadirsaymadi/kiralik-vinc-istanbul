const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const equipmentController = require("../controllers/equipmentController");

// Vinç route'ları
router.get("/kiralik-vinc-:district", categoryController.district);
router.get(
  "/kiralik-vinc-:district/:neighborhood",
  categoryController.neighborhood
);

// Sepetli platform route'ları
router.get(
  "/kiralik-sepetli-platform-:district",
  equipmentController.districtPlatforms
);
router.get(
  "/kiralik-sepetli-platform-:district/:neighborhood",
  equipmentController.neighborhoodPlatforms
);

// Forklift route'ları
router.get(
  "/kiralik-forklift-:district",
  equipmentController.districtForklifts
);
router.get(
  "/kiralik-forklift-:district/:neighborhood",
  equipmentController.neighborhoodForklifts
);

module.exports = router;
