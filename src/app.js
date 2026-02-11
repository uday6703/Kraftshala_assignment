const express = require("express");
require("dotenv").config();

const userRoutes = require("./modules/user/index");
const meetingRoutes = require("./modules/meeting/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

app.use(errorHandler);

module.exports = app;
