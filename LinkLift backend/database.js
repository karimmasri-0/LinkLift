const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

exports.connectDB = async () => {
  try {
    mongoose
      .connect(process.env.DB_URI)
      .then(() => {
        console.log("Connection succesfull to database");
      })
      .catch((error) => {
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE" + error);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
