const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const topReviewsController = require("../controllers/topReviewsController");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs").promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

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

router.post("/update-user", upload.array("images"), async (req, res) => {
  try {
    var formdata = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID 87c45a2e9075dd6");
    Promise.all(
      req.files.map(async (file) => {
        const base64Images = await fs.readFile("uploads/" + file.filename, {
          encoding: "base64",
        });
        formdata.append("image", base64Images);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        return await fetch("https://api.imgur.com/3/image", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            var filesNames = {};
            if (file.filename.includes("__CERTIFICATE__"))
              filesNames["CERTIFICATE"] = JSON.parse(result).data.link;
            else if (file.filename.includes("__CARIMAGE__"))
              filesNames["CARIMAGE"] = JSON.parse(result).data.link;
            else if (file.filename.includes("__PICTURE__"))
              filesNames["PICTURE"] = JSON.parse(result).data.link;

            return filesNames;
          })
          .catch((error) => console.log("error", error));
      })
    ).then((namesArray) => userController.updateUser(req, res, namesArray));
  } catch (error) {
    console.log(error);
  }
});

router.get("/top-reviews", (req, res) => {
  topReviewsController.getTopReviews(req, res);
});

module.exports = router;
