const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/userRoutes");
const top
const dbURi = "";

mongoose
  .connect(dbURi)
  .then(() => {
    console.log("SUCCESSFUL DATABSE CONNECTION");
    app.listen(3030);
  })
  .catch((error) => console.error(error));

app.use("/user", userRoutes);
app.use('',)
app.use((req, res) => {
  res.status(404).json({ error: true });
});
