const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/kiralik-vinc-:district", categoryController.district);
router.get(
  "/kiralik-vinc-:district/:neighborhood",
  categoryController.neighborhood
);

module.exports = router;
