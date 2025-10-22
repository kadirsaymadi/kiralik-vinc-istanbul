const express = require("express");
const path = require("path");
const router = express.Router();
const homeController = require("../controllers/homeController");
const equipmentController = require("../controllers/equipmentController");
const craneController = require("../controllers/craneController");

router.get("/", homeController.index);
router.get("/hizmet-bolgeleri", homeController.districts);
// Bu route src/routes/cranes.js dosyasında tanımlı - kopya route kaldırıldı
router.get("/vinc/:crane", craneController.detail);
router.get("/kiralik-sepetli-platformlar", equipmentController.platforms);
router.get(
  "/kiralik-sepetli-platformlar/:platform",
  equipmentController.platformDetail
);
router.get("/kiralik-forkliftler", equipmentController.forklifts);
router.get(
  "/kiralik-forkliftler/:forklift",
  equipmentController.forkliftDetail
);
router.get("/iletisim", homeController.contact);
router.get("/teklif-al", homeController.contactForOffer);
router.get("/sitemap.xml", homeController.sitemap);

module.exports = router;
