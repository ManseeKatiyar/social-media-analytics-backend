console.log("🔥 APP.JS LOADED");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/twitter", require("./routes/twitter"));
app.use("/analytics", require("./routes/analytics"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

module.exports = app;
