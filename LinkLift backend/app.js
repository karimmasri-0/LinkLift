const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbURi = "";

mongoose
  .connect(dbURi)
  .then(() => {
    console.log("SUCCESSFUL DATABSE CONNECTION");
    app.listen(3030);
  })
  .catch((error) => console.error(error));

app.use((req, res) => {
  res.status(404).json({ error: true });
});
