const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  ipfsImgUri: {
    type: String,
  },
  tokenUri: {
    type: String,
  },
  originalCreator: {
    type: String,
  },
  scratchCollectiveId: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  txHash: {
    type: String,
  },
  networkId: {
    type: Number,
  },
  parents: {
    baseImageUrl: {
      type: String,
    },
    styleImageUrl: {
      type: String,
    },
  },
});

module.exports = Post = mongoose.model("art", ArtSchema);
