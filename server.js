// import packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// set port and create app
const PORT = process.env.PORT || 3000;
const app = express();

// logger and asset middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// home routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/"));

// start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
