const User = require("../models/userModel");
const Driver = require("../models/driverModel");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const merge = require("deepmerge");

const decodeToken = async (token) => {
  const decoded = await promisify(jsonwebtoken.verify)(
    token,
    process.env.JWT_SECRET
  );
  return decoded.id;
};
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
        finished_setting_up: false,
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
  try {
    const id = new ObjectId(await decodeToken(req.query.token));
    console.log(
      "////////////////////////////////////////",
      id,
      "////////////////////////////////////////"
    );
    var currentUser = await User.findOne({ _id: id });
    if (!currentUser)
      return res.status(404).json({ error: true, message: "Error Occured" });
    if (currentUser.position == "Driver") {
      var driver = await Driver.findOne({ user: id });
      console.log("driver >>> ", driver);
      if (driver) {
        console.log(true);
        currentUser = { ...driver.toObject(), ...currentUser.toObject() };
        console.log("currentUser >>> ", currentUser);
      }
    }
    delete currentUser.password;
    return res.status(200).json({ message: "ok", user_data: currentUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

exports.updateUser = async (req, res, namesArray) => {
  try {
    var currentUser = {};
    const updateUser = {};
    const updateDriver = {};
    const userID = await decodeToken(req.headers.token);
    console.log(
      "////////////////UPDATE USER////////////////////////\n",
      await decodeToken(req.headers.token),
      "\n///////////////////////////////////////////////////"
    );
    for (let index = 0; index < namesArray.length; index++) {
      if (namesArray[index].hashasOwnProperty("CARIMAGE"))
        updateDriver.car_image = namesArray[index]["CARIMAGE"];
      if (namesArray[index].hashasOwnProperty("CERTIFICATE"))
        updateDriver.certificate = namesArray[index]["CERTIFICATE"];
      if (namesArray[index].hashasOwnProperty("PICTURE"))
        updateUser.picture = namesArray[index]["PICTURE"];
    }

    updateUser.first_name = req.body.firstName;
    updateUser.last_name = req.body.lastName;
    updateUser.email = req.body.email;
    updateUser.gender = req.body.gender;
    updateUser.position = req.body.position;
    if (req.body.phone) updateUser.phone_number = req.body.phone;
    if (
      req.body.firsName &&
      req.body.lastName &&
      req.body.email &&
      req.body.gender &&
      req.body.position
    )
      updateUser.finished_setting_up = true;
    else updateUser.finished_setting_up = false;
    await User.findOneAndUpdate({ _id: userID }, updateUser, {
      new: true,
    }).then((e) => (currentUser = e.toObject()));
    if (req.body.position == "Driver") {
      if (req.body.age) updateDriver.age = req.body.age;
      if (req.body.vehiculeType)
        updateDriver.vehicule_type = req.body.vehiculeType;
      if (req.body.registrationNumber)
        updateDriver.registration_number = req.body.registrationNumber;
      if (req.body.preferences) updateDriver.preferences = req.body.preferences;

      if (
        req.body.age &&
        req.body.vehiculeType &&
        req.body.registrationNumber &&
        updateDriver.car_image &&
        updateDriver.certificate &&
        req.body.preferences
      )
        updateDriver.finished_setting_up = true;
      else updateDriver.finished_setting_up = false;
      await Driver.findOneAndUpdate({ user: userID }, updateDriver, {
        upsert: true,
        new: true,
      }).then((e) => (currentUser = { ...e.toObject(), ...currentUser }));
    }
    // console.log("updateUser >>> ", updateUser);
    // console.log("updateDriver >>> ", updateDriver);
    delete currentUser.password;
    currentUser.finished_setting_up = true;
    console.log(currentUser);
    return res.status(200).json({ message: "ok", user_data: currentUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};
