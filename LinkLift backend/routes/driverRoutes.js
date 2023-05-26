const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const authenticateToken = require("../authMiddleware");

router.get("/get-cities", (req, res) => {
  driverController.getCities(req, res);
});

router.post("/publish-ride", authenticateToken, (req, res) => {
  driverController.publishRide(req, res);
});

module.exports = router;
