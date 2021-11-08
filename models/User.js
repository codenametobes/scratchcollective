const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  nonce: {
    type: Number,
    default: Math.floor(Math.random() * 10000),
  },
  publicAddress: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
  },
  bio: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
