const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minLength: 3,
    },
    phone_number: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      minLength: 8,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minLength: 6,
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"],
    },
    picture: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      required: false,
      enum: ["Driver", "Passenger", "undefined"],
    },
    finished_setting_up_google_user: {
      type: String,
      required: true,
    },
    finished_setting_up_driver: {
      type: String,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async (next) => {
  try {
    // if (this.isModified("password")) {
    // return next();
    // }
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfterTokenIssued = (JWTTimestamp) => {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parse(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangeTime > JWTTimestamp;
  }
  return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
