const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const topReviewsController = require("../controllers/topReviewsController");

router.get("/auth/create", (req, res) => {
  console.log("\n");
  console.log("host: " + req.hostname);
  console.log("pathname: " + req.path);
  console.log("method: " + req.method);
  res.status(200).json({ error: false });
});

router.post("/auth/register", (req, res) => {
  userController.signUp(req, res);
});
router.post("/auth/login", (req, res) => {
  userController.login(req, res);
});
router.post("/auth/check-token", (req, res) => {
  userController.checkToken(req, res);
});
router.post("/auth/google-login", (req, res) => {
  userController.googleLogin(req, res);
});

router.get("/user", (req, res) => {
  userController.getUser(req, res);
});
router.post("/update-user", (req, res) => {
  userController.updateUser(req, res);
});

router.get("/top-reviews", (req, res) => {
  topReviewsController.getTopReviews(req, res);
});

module.exports = router;
