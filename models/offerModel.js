const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/userModel");

const offerSchema = new Schema(
  {
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      bsonType: "objectId",
      required: true,
    },
    taken: {
      type: Boolean,
      bsonType: "bool",
      required: true,
    },
    taken_by: {
      type: Schema.Types.ObjectId,
      bsonType: "objectId",
      required: true,
    },
    deparature: {
      type: String,
      bsonType: "string",
      required: true,
    },
    arrival: {
      type: String,
      bsonType: "string",
      required: true,
    },
    distance: {
      type: Schema.Types.Decimal128,
      bsonType: "double",
      default: 0.0,
      required: true,
    },
    passage: {
      type: [String],
      bsonType: "array",
      required: true,
    },
    departure_date: {
      type: Date,
      bsonType: "string",
      required: true,
    },
    passengers_nb: {
      type: Number,
      bsonType: "int",
      required: true,
    },
    cost: {
      type: Schema.Types.Decimal128,
      bsonType: "double",
      default: 0.0,
      required: true,
    },
    luggage: {
      size: {
        type: String,
        bsonType: "string",
        enum: ["sm", "md", "lg", "xl"],
        required: false,
      },
      space: {
        type: Number,
        bsonType: "int",
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
