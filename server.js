// import packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// set port and create app
const PORT = process.env.PORT || 3000;
const app = express();

// logger and asset middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

// start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});