const User = require("../models/userModel");
const Driver = require("../models/driverModel");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (_id, position) => {
  return jsonwebtoken.sign({ _id, position }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createAndSendToken = (user, res, statusCode) => {
  console.log(user);
  const token = signToken(user._id, user.position);
  return res.status(statusCode).json({ token });
};
exports.checkEmail = async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  console.log(emailCheck);
  if (emailCheck) {
    const checkSameUser = await User.findOne({
      email: req.body.email,
      _id: req.body._id,
    });
    if (checkSameUser) return res.status(200).json({ email: req.body.email });
    return res.status(409).json({ message: "Email already in use" });
  }
  return res.status(200).json({ email: req.body.email });
};
exports.signUp = async (req, res) => {
  try {
    const passRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;

    if (
      !(
        req.body.first_name &&
        req.body.last_name &&
        req.body.email &&
        req.body.password &&
        req.body.password_confirm &&
        req.body.gender &&
        req.body.position
      )
    ) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      return res.status(409).json({ message: "Email already in use" });
    }
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (req.body.password !== req.body.password_confirm) {
      return res.status(400).json({ message: "Password didn't match" });
    }
    if (!passRegex.test(req.body.password)) {
      return res.status(400).json({ message: "Password failed" });
    }
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      position: req.body.position,
      picture: "https://i.imgur.com/Zvno7g3.png",
      finished_setting_up: req.body.position === "Driver" ? false : true,
    });
    createAndSendToken(newUser, res, 201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.password)
      return res.status(401).json({ message: "Please login with google." });
    if (!(await user.checkPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    createAndSendToken(user, res, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: true, message: "You are not logged in." });
//   }
//   let decoded;
//   try {
//     decoded = await promisify(jsonwebtoken.verify)(
//       token,
//       process.env.JWT_SECRET
//     );
//     const currentUser = User.findById(decoded.id);
//     if (!currentUser) {
//       return res
//         .status(401)
//         .json({ error: true, message: "The token owner no longer exist" });
//     }
//     if (currentUser.passwordChangedAfterTokenIssued(decoded.iat)) {
//       return res.status(401).json({
//         error: true,
//         message: "Your password has been changed please log in again.",
//       });
//     }

//     req.user = currentUser;
//     next();
//   } catch (error) {
//     if (error.name === "JsonWebTokenError")
//       return res.status(401).json({ error: true, message: "Invalid Token" });
//     else if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ error: true, message: "Token expired" });
//     }
//   }
// };

// exports.checkToken = async (req, res) => {
//   console.log("checking token", req.body.token);
//   try {
//     const decoded = await promisify(jsonwebtoken.verify)(
//       req.body.token,
//       process.env.JWT_SECRET
//     );
//     const currentUser = User.findById(decoded);
//     if (currentUser) {
//       return res.status(200).json({ error: false, message: "Valid Token" });
//     } else {
//       return res.status(401).json({ error: true, message: "Invalid Token" });
//     }
//   } catch (error) {
//     if (error.name === "JsonWebTokenError")
//       return res.status(401).json({ error: true, message: "Invalid Token" });
//     else if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ error: true, message: "Token expired" });
//     }
//   }
// };

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
        position: undefined,
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
    var currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser)
      return res.status(404).json({ error: true, message: "Error Occured" });
    if (currentUser.position == "Driver") {
      var driver = await Driver.findOne({ user: req.user._id });
      if (driver) {
        currentUser = { ...driver.toObject(), ...currentUser.toObject() };
      }
    }
    delete currentUser.password;
    // console.log(currentUser);
    return res.status(200).json({ message: "ok", user_data: currentUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

exports.updateUser = async (req, res, namesArray) => {
  try {
    var currentUser = {};
    const temp = { finished_setting_up: false };
    const updateUser = {};
    const updateDriver = {};
    console.log(
      "////////////////UPDATE USER////////////////////////\n",
      namesArray,
      "\n///////////////////////////////////////////////////"
    );
    for (let index = 0; index < namesArray.length; index++) {
      if (Object.keys(namesArray[index])[0] === "CARIMAGE")
        updateDriver.car_image = namesArray[index]["CARIMAGE"];
      if (Object.keys(namesArray[index])[0] === "CERTIFICATE")
        updateDriver.certificate = namesArray[index]["CERTIFICATE"];
      if (Object.keys(namesArray[index])[0] === "PICTURE")
        updateUser.picture = namesArray[index]["PICTURE"];
    }

    updateUser.first_name = req.body.firstName;
    updateUser.last_name = req.body.lastName;
    updateUser.email = req.body.email;
    updateUser.gender = req.body.gender;
    updateUser.position = req.body.position;
    updateUser.phone_number = req.body.phone;
    await User.findOneAndUpdate({ _id: req.user._id }, updateUser, {
      new: true,
    }).then(async (e) => {
      if (
        e.toObject().first_name &&
        e.toObject().last_name &&
        e.toObject().email &&
        e.toObject().gender
      ) {
        temp.finished_setting_up = true;
      } else {
        temp.finished_setting_up = false;
      }
      return await User.findOneAndUpdate({ _id: req.user._id }, temp, {
        upsert: true,
        new: true,
      }).then((e) => (currentUser = e.toObject()));
    });
    if (req.body.position === "Driver") {
      updateDriver.age = req.body.age;
      updateDriver.vehicule_type = req.body.vehiculeType;
      updateDriver.registration_number = req.body.registrationNumber;
      updateDriver.preferences = req.body.preferences;
      await Driver.findOneAndUpdate({ user: req.user._id }, updateDriver, {
        upsert: true,
        new: true,
      }).then(async (d) => {
        if (
          d.toObject().age &&
          d.toObject().vehicule_type &&
          d.toObject().registration_number &&
          d.toObject().car_image &&
          d.toObject().certificate &&
          d.toObject().preferences &&
          temp.finished_setting_up === true
        )
          temp.finished_setting_up = true;
        else temp.finished_setting_up = false;
        return await User.findOneAndUpdate({ _id: req.user._id }, temp, {
          new: true,
        }).then((p) => {
          currentUser = { ...d.toObject(), ...p.toObject() };
          return currentUser;
        });
      });
    }
    delete currentUser.password;
    createAndSendToken(currentUser, res, 200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};
