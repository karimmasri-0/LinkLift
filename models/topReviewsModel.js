const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topReviewsSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 6, unique: true },
    is_driver: { type: Boolean, required: true },
    comment: { type: String, required: true, minLength: 12 },
    rate: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const TopReviews = mongoose.model("TopReviews", topReviewsSchema);
module.exports = TopReviews;
