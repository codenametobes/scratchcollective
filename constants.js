// frontend config
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  ipfsProjectId: process.env.IPFS_INFURA_PROJECT_ID,
  ipfsProjectSecret: process.env.IPFS_INFURA_PROJECT_SECRET,
  imgurClientId: process.env.IMGUR_CLIENT_ID,
  localPythonPath: process.env.LOCAL_PYTHONPATH,
};
