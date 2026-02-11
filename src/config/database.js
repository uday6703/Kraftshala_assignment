const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not set in environment variables");
}

const connectDatabase = async () => {
  await mongoose.connect(mongoUrl);
};

module.exports = connectDatabase;
