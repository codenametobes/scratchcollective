// mongodb connection logic
const mongoose = require("mongoose");
const { mongoUri } = require("../constants");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("Wasn't able to connect");
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
