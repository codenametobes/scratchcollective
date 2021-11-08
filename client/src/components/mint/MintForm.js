import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import { web3, contract } from "../../ethereum/web3";

import { setSnackbar } from "../../store/alert-actions";

const useStyles = makeStyles((theme) => ({
  aiTitle: {
    fontSize: "2rem",
    whiteSpace: "nowrap",
    margin: "0 auto",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileNameTitle: {
    textDecoration: "underline",

    color: "#921100",
    margin: "0 auto",
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  thumb: {
    display: "flex",
    border: "solid",
    borderWidth: "1px",
    borderRadius: "5%",
    marginBottom: 15,
    marginRight: 8,
    MaxHeight: 300,
    MaxWidth: 400,
    height: 250,
    width: 380,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  img: {
    display: "block",
    maxHeight: 300,
    maxWidth: 400,
    width: 380,
    height: "auto",
    borderRadius: "5%",
    marginTop: 50,
  },
  margin: {
    marginTop: 8,
  },
  label: {
    width: "350px",
  },
  styleText: {
    display: "block",
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: "center",
  },
  txText: {
    fontSize: "0.6rem",
    cursor: "pointer",
    color: "#69da72",
    overflowWrap: "break-word",
  },
  placeholderBox: {
    display: "flex",
    border: "1px",
    borderStyle: "solid",
    marginBottom: 50,
    marginRight: 8,
  },
  previewText: {
    color: "#8e7cc3",
  },
  previewSubText: {
    color: "#bcbcbc",
  },
}));

const MintForm = ({
  renderGenerated,
  generateIsLoading,
  setMintIsLoading,
  mintIsLoading,
  setTogglePreview,
  handleMintOnHover,
  handleMintOnClose,
  handleDownloadOnHover,
  handleDownloadOnClose,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [txHash, setTxHash] = useState("");

  let network;
  const chain = useSelector((state) => state.eth.currentChain);

  if (chain === 1) {
    network = "";
  } else if (chain === 3) {
    network = "ropsten.";
  } else if (chain === 4) {
    network = "rinkeby.";
  } else if (chain === 5) {
    network = "goerli.";
  } else if (chain === 42) {
    network = "kovan.";
  }

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  // function to be used in mint
  const addArtTx = async (ipfs_cid) => {
    let txHash;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addNewArt(ipfs_cid)
        .send({ from: accounts[0] })
        .on("transactionHash", (transactionHash) => {
          txHash = transactionHash;
          setTxHash(transactionHash);
          dispatch(setSnackbar(false, "info", ""));
          dispatch(
            setSnackbar(
              true,
              "info",
              "Your NFT is minting! Please stay on page"
            )
          );
        })
        .on("error", (error, receipt) => {
          const readError = JSON.stringify(error.message);
          setMintIsLoading(false);
          dispatch(setSnackbar(true, "error", readError));
        });
    } catch (err) {
      return;
    }

    return txHash;
  };

  const artSupplyCall = async () => {
    const supply = await contract.methods.artSupply().call();
    return supply;
  };

  const ogCreatorCall = async (id) => {
    const creator = await contract.methods.original_creator(id).call();
    return creator;
  };

  // ***** MINT ****************
  const mint = async () => {
    try {
      setMintIsLoading(true);
      dispatch(
        setSnackbar(
          true,
          "info",
          "Please click 'Confirm' in Metamask window to mint your NFT (may take a few seconds to pop up)"
        )
      );
      const formData = new FormData();

      // get ID by calling artSupply from contract
      const artSupply = await artSupplyCall();
      const newIdInt = parseInt(artSupply);
      const newId = await artSupply.toString();

      // instance of web3 to get current account
      const accounts = await web3.eth.getAccounts();
      const minter = accounts[0];

      // set up art data to send to ipfs, and in turn smart contract
      formData.append("name", name);
      formData.append("description", description);
      formData.append("id", newId);
      formData.append("creator", minter);

      let metadataInfo;

      // uploads image to ipfs, creates ipfs json metadata, returns CID of both
      try {
        await fetch("/api/mint", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => (metadataInfo = data.mintData));
      } catch (err) {
        console.log(err);
        setMintIsLoading(false);
        setDescription("");
        setName("");
        setTogglePreview(false);
        dispatch(
          setSnackbar(
            true,
            "error",
            `Something went wrong with the minting :( --- error: ${err}`
          )
        );
      }

      // need an if statement for everything below based on successful api/mint call
      const metadata = metadataInfo.cid;
      const imgCid = metadataInfo.imgCid;
      const imgUrl = metadataInfo.imgurLink;
      const parent1Url = metadataInfo.parent1Link;
      const parent2Url = metadataInfo.parent2Link;

      const tokenUri = `https://ipfs.io/ipfs/${metadata}`;
      const ipfsImgUri = `https://ipfs.io/ipfs/${imgCid}`;

      // send addNewArt contract method
      const newArt = await addArtTx(metadata);
      const originalCreator = await ogCreatorCall(newIdInt);

      // save data to mongodb for retrieval in other components
      if (originalCreator && newArt) {
        let mongo;
        const mongoData = {
          name: name,
          description: description,
          imgUrl: imgUrl,
          originalCreator: originalCreator,
          scratchCollectiveId: newId,
          ipfsImgUri: ipfsImgUri,
          tokenUri: tokenUri,
          txHash: newArt,
          networkId: chain,
          baseImageUrl: parent1Url,
          styleImageUrl: parent2Url,
        };

        try {
          mongo = await fetch("/api/mint/store", {
            method: "POST",
            body: JSON.stringify(mongoData),
            headers: { "Content-type": "application/json" },
          });
        } catch (err) {
          console.log(err);
          console.log(
            `Your NFT was minted but we had an issue storing it on our databases\nThis is your transaction hash: ${newArt}\nThis is your tokenURL: ${tokenUri}\n You can also check your contract address on Etherscan for more info.`
          );
          setMintIsLoading(false);
          dispatch(
            setSnackbar(
              true,
              "error",
              "Something went wrong storing your NFT. However, check the console for your txHash and the token URL"
            )
          );
        }

        // if success show "minted" alert + redirect to view page
        if (mongo) {
          setMintIsLoading(false);
          dispatch(
            setSnackbar(
              true,
              "success",
              "Success! Your NFT has been minted. Redirecting to view page..."
            )
          );
          setTimeout(() => {
            history.push(`/view/${newId}`);
          }, 5000);
        }
      }
    } catch (err) {
      // clear all the input: text and previews
      console.log(err);
      setMintIsLoading(false);
      setDescription("");
      setName("");
      setTogglePreview(false);
      dispatch(
        setSnackbar(true, "error", "Something went wrong with the minting :(")
      );
    }
  };

  return (
    <Box mt={4} textAlign="center">
      <Box mb={0} paddingRight={3}>
        <Typography className={classes.aiTitle}>AI-Styled Image</Typography>
      </Box>
      <div className={classes.thumb}>
        {!renderGenerated && !generateIsLoading && (
          <Box className={classes.styleText}>
            <Box mt={0}>
              {" "}
              <Typography className={classes.previewText}>
                Base Image + Style Image = AI-Styled Image
              </Typography>
            </Box>
            <Box mt={2.5}>
              {" "}
              <Typography className={classes.previewSubText}>
                A preview of our AI-Generated art will go here upon successful
                generation.
              </Typography>
            </Box>
          </Box>
        )}
        {renderGenerated && (
          <Box>
            <img src={renderGenerated} alt="woops" className={classes.img} />
          </Box>
        )}
        {generateIsLoading && (
          <Box>
            <Box>
              <CircularProgress color="secondary" />
            </Box>
            <br />
            <Box display="flex">
              <Typography className={classes.loadingText}>
                Your image is being generated (Please allow ~30sec). Hang tight!
                👨‍🎨
              </Typography>
            </Box>
          </Box>
        )}
      </div>
      <Box mt={renderGenerated ? 7 : 5} className={classes.label}>
        <TextField
          className={classes.margin}
          label="Name"
          variant="filled"
          size="small"
          // fullWidth
          helperText="Name your artpiece"
          style={{
            width: "380px",
          }}
          InputLabelProps={{
            style: { fontSize: 12 },
          }}
          FormHelperTextProps={{
            style: { fontSize: 9 },
          }}
          onChange={nameHandler}
        />
        <br />
        <TextField
          className={classes.margin}
          label="Description"
          variant="filled"
          size="small"
          multiline
          rows={2}
          // fullWidth
          helperText="Set a description for your artpiece"
          style={{
            width: "380px",
          }}
          InputLabelProps={{
            style: { fontSize: 12 },
          }}
          FormHelperTextProps={{
            style: { fontSize: 9 },
          }}
          onChange={descriptionHandler}
        />
        <Box py={1}>
          <Box mb={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              // fullWidth
              style={{
                width: "380px",
              }}
              disabled={mintIsLoading || generateIsLoading}
              href={renderGenerated}
              download
              onMouseEnter={handleDownloadOnHover}
              onMouseLeave={handleDownloadOnClose}
            >
              Download
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            // fullWidth
            style={{
              width: "380px",
            }}
            startIcon={<MonetizationOnIcon />}
            disabled={mintIsLoading || generateIsLoading}
            onMouseEnter={handleMintOnHover}
            onMouseLeave={handleMintOnClose}
            onClick={mint}
          >
            Mint AI-Styled
          </Button>
        </Box>
        {txHash !== "" && (
          <Box textAlign="center">
            <Typography
              className={classes.txText}
              onClick={() =>
                // get current chain w useSelect -> change link to etherscan based on
                window.open(
                  `https://${network}etherscan.io/tx/${txHash}`,
                  "_blank"
                )
              }
            >
              Tx Hash (Click Here): {txHash}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MintForm;
