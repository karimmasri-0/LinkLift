const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      // bsonType: "objectId",
      required: true,
    },
    taken_by: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      // bsonType: "objectId",
    },
    departure: {
      type: String,
      bsonType: "string",
    },
    destination: {
      type: String,
      bsonType: "string",
    },
    distance: {
      type: Schema.Types.Decimal128,
      bsonType: "double",
      default: 0.0,
    },
    duration: {
      type: Schema.Types.Decimal128,
      bsonType: "double",
      default: 0.0,
    },
    passage: {
      type: [String],
      bsonType: "array",
    },
    date: {
      type: String,
      bsonType: "string",
    },
    time: {
      type: String,
      bsonType: "string",
    },
    seats: {
      type: Number,
      bsonType: "int",
      enum: [1, 2, 3, 4, 5],
    },
    cost: {
      type: Schema.Types.Decimal128,
      bsonType: "double",
      default: 0.0,
    },
    luggage_size: {
      type: String,
      bsonType: "string",
      enum: ["small", "medium", "large", "extra_large"],
    },
    luggage_number: {
      type: Number,
      bsonType: "int",
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
