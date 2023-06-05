const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const authenticateToken = require("../authMiddleware");

router.get("/get-ride", (req, res) => {
  offerController.getOffer(req, res);
});
router.get("/get-rides", (req, res) => {
  offerController.getOffers(req, res);
});
router.get("/my-rides", authenticateToken, (req, res) => {
  offerController.getMyOffers(req, res);
});
router.post("/book-ride", authenticateToken, (req, res) => {
  offerController.bookRide(req, res);
});
router.get("/search", (req, res) => {
  offerController.search(req, res);
});

module.exports = router;
