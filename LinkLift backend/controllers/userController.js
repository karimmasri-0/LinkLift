const User = require("../models/userModel");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcrypt");

const signToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createAndSendToken = (user, res, statusCode) => {
  const token = signToken(user._id);
  return res.status(statusCode).json({
    error: false,
    token,
    data: { user },
  });
};

exports.signUp = async (req, res) => {
  try {
    if (
      !(
        req.body.first_name &&
        req.body.last_name &&
        req.body.email &&
        req.body.password &&
        req.body.password_confirm &&
        req.body.phone_number &&
        req.body.gender &&
        req.body.is_driver
      )
    ) {
      return res.status(400).json({ error: true, message: "Invalid request" });
    }
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      return res
        .status(409)
        .json({ error: true, message: "Email already in use" });
    }
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: true, message: "Invalid email" });
    }
    if (req.body.password !== req.body.password_confirm) {
      return res
        .status(400)
        .json({ error: true, message: "Password didn't match" });
    }
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      is_driver: req.body.is_driver,
      picture: "https://i.imgur.com/Zvno7g3.png",
    });
    createAndSendToken(newUser, res, 201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found." });
    }
    if (!(await user.checkPassword(password, user.password))) {
      return res
        .status(401)
        .json({ error: true, message: "Incorrect email or password." });
    }
    createAndSendToken(user, res, 200);
  } catch (error) {}
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "You are not logged in." });
  }
  let decoded;
  try {
    decoded = await promisify(jsonwebtoken.verify)(
      token,
      process.env.JWT_SECRET
    );
    const currentUser = User.findById(decoded.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ error: true, message: "The token owner no longer exist" });
    }
    if (currentUser.passwordChangedAfterTokenIssued(decoded.iat)) {
      return res.status(401).json({
        error: true,
        message: "Your password has been changed please log in again.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ error: true, message: "Invalid Token" });
    else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: true, message: "Token expired" });
    }
  }
};

exports.checkToken = async (req, res) => {
  console.log("checking token", req.body.token);
  try {
    const decoded = await promisify(jsonwebtoken.verify)(
      req.body.token,
      process.env.JWT_SECRET
    );
    const currentUser = User.findById(decoded);
    if (currentUser) {
      return res.status(200).json({ error: false, message: "Valid Token" });
    } else {
      return res.status(401).json({ error: true, message: "Invalid Token" });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ error: true, message: "Invalid Token" });
    else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: true, message: "Token expired" });
    }
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const decoded = jsonwebtoken.decode(req.body.googleCredentialResponse);
    console.log(decoded);
    const findUser = await User.findOne({ email: decoded.email });
    if (!findUser) {
      const newUser = await User.create({
        first_name: decoded.given_name,
        last_name: decoded.family_name,
        picture: decoded.picture,
        email: decoded.email,
        finished_setting_up_google_user: false,
      });
      createAndSendToken(newUser, res, 201);
    } else {
      createAndSendToken(findUser, res, 201);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: true, message: "Error occured" });
  }
};

exports.getUser = async (req, res) => {
  const decoded = await promisify(jsonwebtoken.verify)(
    req.query.token,
    process.env.JWT_SECRET
  );
  const currentUser = await User.findOne({ _id: decoded.id });
  console.log(currentUser);
  if (!currentUser)
    return res.status(404).json({ error: true, message: "Error Occured" });
  return res.status(200).json({ error: false, user_data: currentUser });
};

exports.updateUser = async (req, res) => {
  console.log(
    "////////////////UPDATE USER////////////////////////\n",
    req.body.data,
    "\n///////////////////////////////////////////////////"
  );
  // const decodedToken = await promisify(jsonwebtoken.verify)(
  //   req.body.token,
  //   process.env.JWT_SECRET
  // );
  // const test = await User.findOneAndUpdate(
  //   { _id: decodedToken.id },
  //   { ...req.body.data }
  // );
  // console.log(test);
  return res.status(200).json({ message: "ok" });
};
