const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const driverSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
      bsonType: "int",
      default: null,
      // required: true,
    },
    vehicule_type: {
      type: String,
      bsonType: "string",
      default: null,
      // required: true,
    },
    registration_number: {
      type: Number,
      bsonType: "int",
      default: null,
      // required: false,
    },
    certificate: {
      type: String,
      bsonType: "string",
      default: null,
      // required: false,
    },
    car_image: {
      type: String,
      bsonType: "string",
      default: null,
      // required: false,
    },
    preferences: {
      type: Array,
      bsonType: "array",
      default: [],
    },
    evaluation: {
      comments: {
        type: Map,
        of: String,
        bsonType: "object",
        // required: false,
      },
      review: {
        rating: {
          type: Schema.Types.Decimal128,
          bsonType: "double",
          // required: false,
        },
        number_of_raters: {
          type: Number,
          bsonType: "int",
          // required: false,
        },
      },
    },
    // finished_setting_up: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  { timestamps: true }
);
const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
