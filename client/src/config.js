// frontend config
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  scratchcollective_mainnet: process.env.REACT_APP_MAINNET_ADDRESS,
  scratchcollective_ropsten: process.env.REACT_APP_ROPSTEN_ADDRESS,
  scratchcollective_rinkeby: process.env.REACT_APP_RINKEBY_ADDRESS,
  scratchcollective_goerli: process.env.REACT_APP_GOERLI_ADDRESS,
  scratchcollective_kovan: process.env.REACT_APP_KOVAN_ADDRESS,
};
