const express = require("express");
const path = require("path");
const router = express.Router();
const homeController = require("../controllers/homeController");
const equipmentController = require("../controllers/equipmentController");

router.get("/", homeController.index);
router.get("/hizmet-bolgeleri", homeController.districts);
router.get("/kiralik-vincler", homeController.craneList);
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
router.get("/teklif-al", homeController.contact);
router.get("/sitemap.xml", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.sendFile(path.join(__dirname, "../../public/sitemap.xml"));
});

module.exports = router;
