const express = require("express");
const router = express.Router();
const topReviewsController = require("../controllers/topReviewsController");

router.post("/add", (req, res) => {
  topReviewsController.addReview(req, res);
});

module.exports = router;
