const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
      bsonType: "int",
      required: true,
    },
    vehicule_type: {
      type: String,
      bsonType: "string",
      required: true,
    },
    registration_number: {
      type: Number,
      bsonType: "int",
      required: false,
    },
    certificate: {
      type: String,
      bsonType: "string",
      required: false,
    },
    car_image: {
      type: String,
      bsonType: "string",
      required: false,
    },
    preferences: {
      animals_allowed: {
        type: Boolean,
        bsonType: "bool",
        required: false,
      },
      smoking_allowed: {
        type: Boolean,
        bsonType: "bool",
        required: false,
      },
      kids_allowed: {
        type: Boolean,
        bsonType: "bool",
        required: false,
      },
    },
    evaluation: {
      comments: {
        type: Map,
        of: String,
        bsonType: "object",
        required: false,
      },
      review: {
        rating: {
          type: Schema.Types.Decimal128,
          bsonType: "double",
          required: false,
        },
        number_of_raters: {
          type: Number,
          bsonType: "int",
          required: false,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
