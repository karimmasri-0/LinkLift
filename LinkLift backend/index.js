const express = require("express");
const app = express();
const connectDB = require("./database").connectDB;
connectDB();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const topReviewsRoutes = require("./routes/topReviewsRoutes");

app.listen(3030, () => {
  console.log("App Listening on 3030");
});

app.use(userRoutes);
app.use("/reviews", topReviewsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Page not found." });
});
