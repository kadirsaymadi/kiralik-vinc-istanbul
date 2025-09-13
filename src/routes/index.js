const express = require("express");
const path = require("path");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/hizmet-bolgeleri", homeController.districts);
router.get("/iletisim", homeController.contact);
router.get("/teklif-al", homeController.contact);
router.get("/sitemap.xml", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.sendFile(path.join(__dirname, "../../public/sitemap.xml"));
});

module.exports = router;
