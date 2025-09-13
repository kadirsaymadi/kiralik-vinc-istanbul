const express = require("express");
const router = express.Router();
const craneController = require("../controllers/craneController");

router.get("/kiralik-vincler", craneController.list);
router.get("/kiralik-vincler/:crane", craneController.detail);

module.exports = router;
