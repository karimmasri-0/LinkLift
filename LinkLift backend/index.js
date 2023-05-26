const express = require("express");
const app = express();
const connectDB = require("./database").connectDB;
connectDB();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/userRoutes");
const topReviewsRoutes = require("./routes/topReviewsRoutes");
const driverRoutes = require("./routes/driverRoutes");
const offerRoutes = require("./routes/offerRoutes");
app.listen(3030, () => {
  console.log("App Listening on 3030");
});

app.use(userRoutes);
app.use("/reviews", topReviewsRoutes);
app.use(driverRoutes);
app.use(offerRoutes);

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Page not found." });
});
