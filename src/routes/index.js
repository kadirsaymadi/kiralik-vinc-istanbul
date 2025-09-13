const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/ilceler", homeController.districts);
router.get("/iletisim", homeController.contact);
router.get("/teklif-al", homeController.contact);

module.exports = router;
