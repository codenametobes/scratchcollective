import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link as Scroll } from "react-scroll";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { setSnackbar } from "../../store/alert-actions";

import { web3, contract } from "../../ethereum/web3";

import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PowerIcon from "@material-ui/icons/Power";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Popover from "@material-ui/core/Popover";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RestoreIcon from "@material-ui/icons/Restore";

import NavbarDark from "../layout/NavbarDark";
import DropZone from "./UploadDrop";
import MintForm from "./MintForm";
import Drake from "../../assets/drake1.png";
import Number1 from "../../assets/number1.png";
import RunningChunky from "../../assets/runningChunky.png";
import DownloadingIt from "../../assets/downloadingit.png";
import DoOne from "../../assets/doOne.gif";
import AliensBro from "../../assets/aliensbro.png";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  supportedFilesText: {
    fontSize: 10,
  },
  label: {
    width: "300px",
    textAlign: "right",
  },
  scrollText: {
    color: "#000000",
    fontSize: "1.2rem",
    fontWeight: 500,
    cursor: "pointer",
  },
  show: {
    color: "#FD5353",
  },
  me: {
    color: "#2986cc",
  },
  how: {
    color: "#5E069D",
  },
  this: {
    color: "#38761d",
  },
  works: {
    color: "#e69138",
  },
  plz: {
    color: "#741b47",
  },
  topPic: {
    display: "flex",
    minWidth: 350,
    height: 60,
    width: "auto",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    background: "none",
    marginBottom: -200,
  },
  img: {
    height: 100,
    width: "auto",
  },
  imgLineUp: {
    marginTop: -50,
  },
  goDown: {
    color: "#C06699",
    fontSize: "2.5rem",
  },
  topMargin: {
    marginTop: 20,
  },
  txText: {
    fontSize: "0.8rem",
    cursor: "pointer",
    color: "#6d28b1",
  },
}));

// ********************* CREATE COMPONENENT ********************************************

function Create() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();

  const [singleName, setSingleName] = useState();
  const [singleDescription, setSingleDescription] = useState();

  const [generateIsLoading, setGenerateIsLoading] = useState();
  const [mintIsLoading, setMintIsLoading] = useState();
  const [toggleMintSingle, setToggleMintSingle] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);
  const [togglePreview, setTogglePreview] = useState(false);
  const [toggleBasePreview, setToggleBasePreview] = useState(false);
  const [toggleStylePreview, setToggleStylePreview] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [hoverDrake, setHoverDrake] = useState(false);
  const [hoverNumber, setHoverNumber] = useState(false);
  const [hoverChunky, setHoverChunky] = useState(false);
  const [hoverDownload, setHoverDownload] = useState(false);
  const [hoverMintSingle, setHoverMintSingle] = useState(false);
  const [hoverHowWorks, setHoverHowWorks] = useState(false);

  const [renderGenerated, setRenderGenerated] = useState(false);
  const [imgBlob, setImgBlob] = useState();

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

  // ***************** INPUT HANDLERS ****************************
  const handleSingleName = (event) => {
    setSingleName(event.target.value);
  };

  const handleSingleDescription = (event) => {
    setSingleDescription(event.target.value);
  };

  // ************************** MOUSEOVER TEXT ****************************************
  const multi = [
    {
      _id: 0,
      name: "name1",
      hoverText:
        "Click here if you don't want to mint an AI-Generated piece and want to mint just this image instead",
    },
    {
      _id: 1,
      name: "name2",
      hoverText: "Supported File Types: JPG, JPEG, PNG, JFIF",
    },
  ];

  // ********************* MOUSEOVER HANDLERS ********************************************

  const handlePopoverOpenSingle = (event, popOverId) => {
    setOpenedPopoverId(popOverId);
    setAnchorEl(event.currentTarget);
    setHoverNumber(true);
  };

  const handlePopoverCloseSingle = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
    setHoverNumber(false);
  };

  const handlePopoverOpenGenerate = (event, popOverId) => {
    setOpenedPopoverId(popOverId);
    setAnchorEl(event.currentTarget);
    setHoverChunky(true);
  };

  const handlePopoverCloseGenerate = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
    setHoverChunky(false);
  };

  const handleMintOnHover = () => {
    setHoverDrake(true);
  };

  const handleMintOnClose = () => {
    setHoverDrake(false);
  };

  const handleDownloadOnHover = () => {
    setHoverDownload(true);
  };

  const handleDownloadOnClose = () => {
    setHoverDownload(false);
  };

  const handleMintSingleOnHover = () => {
    setHoverMintSingle(true);
  };

  const handleMintSingleOnClose = () => {
    setHoverMintSingle(false);
  };

  const handleHowWorksOnHover = () => {
    setHoverHowWorks(true);
  };

  const handleHowWorksOnClose = () => {
    setHoverHowWorks(false);
  };

  const handleStartOver = () => {
    setRenderGenerated(false);
    setTogglePreview(false);
    setToggleBasePreview(false);
    setToggleStylePreview(false);
  };

  // ********************************* WEB 3 HELPER FUNCTIONS ***************************
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

  // get
  const getStylized = async () => {
    console.log(`generate 3 ${Date.now()}`);
    try {
      await fetch("/api/generate3", {
        method: "GET",
      })
        .then((res) => res.blob())
        .then((blob) => {
          setImgBlob(blob);
          let objectURL = URL.createObjectURL(blob);
          setRenderGenerated(objectURL);
          dispatch(
            setSnackbar(
              true,
              "success",
              "Success! Check out your masterpiece :)"
            )
          );
          setGenerateIsLoading(false);
        });
    } catch (err) {
      console.log(err.message);
      setGenerateIsLoading(false);
      setRenderGenerated(null);
      setTogglePreview(false);
      dispatch(
        setSnackbar(
          true,
          "error",
          "Something went wrong with the AI generation :("
        )
      );
    }
  };

  // ****************************** GENERATE ON CLICK ****************************
  const generate = async () => {
    dispatch(
      setSnackbar(
        true,
        "info",
        "Hang on! The AI is generating your masterpiece. (Please allow ~30-40 seconds)"
      )
    );

    setRenderGenerated(false);
    setGenerateIsLoading(true);
    const formData = new FormData();

    formData.append("image", image1);
    formData.append("image", image2);

    let handleDirectories;
    let spawnChild;

    //generate 1
    try {
      console.log(`generate1 ${Date.now()}`);
      handleDirectories = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.log(err.message);
      setGenerateIsLoading(false);
      setRenderGenerated(null);
      dispatch(
        setSnackbar(
          true,
          "error",
          `Something went wrong with the AI generation. Error: ${err.message}`
        )
      );
    }

    // generate2 - spawn child python process
    if (handleDirectories != undefined) {
      console.log(`generate2: ${Date.now()}`);
      // dispatch(setSnackbar(true, "info", "generate 2"));
      try {
        await fetch("/api/generate2", {
          method: "GET",
        }).then((response) => console.log(response));
      } catch (err) {
        console.log(err.message);
        setGenerateIsLoading(false);
        setRenderGenerated(null);
        dispatch(
          setSnackbar(
            true,
            "error",
            `Something went wrong with the AI generation :( Error: ${err.message}`
          )
        );
      }
    }

    // generate3 - check if exists set timeout - need a separate function for timeout
    setTimeout(getStylized, 30000);
  };

  // ********************* MINT SINGLE ON CLICK ************************

  const mintSingle = async () => {
    try {
      setMintIsLoading(true);
      dispatch(
        setSnackbar(
          true,
          "info",
          "Please click 'Confirm' in Metamask window to mint your NFT (might take a few seconds to pop up)"
        )
      );

      // get ID by calling artSupply from contract
      const artSupply = await artSupplyCall();
      const newIdInt = parseInt(artSupply);
      const newId = await artSupply.toString();

      // instance of web3 to get current account
      const accounts = await web3.eth.getAccounts();
      const minter = accounts[0];

      // set up art data to send to ipfs, and in turn smart contract
      const formDataSingle = new FormData();

      formDataSingle.append("image", image1);
      formDataSingle.append("name", singleName);
      formDataSingle.append("description", singleDescription);
      formDataSingle.append("id", newId);
      formDataSingle.append("creator", minter);

      // fetch mint single endpoint with metadata info
      let metadataInfo;

      try {
        await fetch("/api/mintsingle", {
          method: "POST",
          body: formDataSingle,
        })
          .then((res) => res.json())
          .then((data) => (metadataInfo = data.mintData));
      } catch (err) {
        // clear all the input ----- text and previews
        setSingleName("");
        setSingleDescription("");
        setRenderGenerated(null);
        setMintIsLoading(false);
        setTogglePreview(false);
        dispatch(
          setSnackbar(true, "error", `Something went wrong with the minting :(`)
        );
        console.log(err);
      }

      // need an if statement for everything below based on successful api/mint call
      const metadata = await metadataInfo.cid;
      const imgCid = await metadataInfo.imgCid;
      const imgUrl = await metadataInfo.imgurLink;

      const tokenUri = `https://ipfs.io/ipfs/${metadata}`;
      const ipfsImgUri = `https://ipfs.io/ipfs/${imgCid}`;

      // send addNewArt contract method
      const newArt = await addArtTx(metadata);
      const originalCreator = await ogCreatorCall(newIdInt);

      // save data to mongodb for retrieval in other components
      if (originalCreator && newArt) {
        let mongo;
        const mongoData = {
          name: singleName,
          description: singleDescription,
          imgUrl: imgUrl,
          originalCreator: originalCreator,
          scratchCollectiveId: newId,
          ipfsImgUri: ipfsImgUri,
          tokenUri: tokenUri,
          txHash: newArt,
          networkId: chain,
          baseImageUrl: "Single Image, base image N/A",
          styleImageUrl: "Single Image, style image N/A",
        };

        try {
          mongo = await fetch("/api/mintsingle/store", {
            method: "POST",
            body: JSON.stringify(mongoData),
            headers: { "Content-type": "application/json" },
          });
        } catch (err) {
          console.log(err);
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
      console.log(err);
      setMintIsLoading(false);
      setSingleName("");
      setSingleDescription("");
      setRenderGenerated(null);
      dispatch(
        setSnackbar(true, "error", `Something went wrong with the minting :(`)
      );
    }
  };

  // ****************** USE EFFECT STARTS HERE **************************
  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
  });

  // ****************** RENDER STARTS HERE **************************
  return (
    <div className={classes.root} id="createMint">
      <CssBaseline />
      <NavbarDark mintIsLoading={mintIsLoading} />
      <Box className={classes.topMargin}>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid item xs={12} md={4}>
            <DropZone
              setImage={setImage1}
              isStyleImg={false}
              title="Base Image"
              togglePreview={togglePreview}
              setTogglePreview={setTogglePreview}
              show={toggleBasePreview}
              setToggleBasePreview={setToggleBasePreview}
              setToggleStylePreview={setToggleStylePreview}
              dropText="#1 - Drag &amp; Drop / Click Here to Select a Base Image"
              previewText="Start Here"
              previewText2="Click or Drag and Drop an image."
              previewText3="*Only .JPG, .JPEG, .PNG, .JFIF files supported"
              type={1}
            />
            <Box mb={0}>
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
                onClick={() => setToggleMintSingle(!toggleMintSingle)}
                onMouseEnter={(e) => handlePopoverOpenSingle(e, 1)}
                onMouseLeave={handlePopoverCloseSingle}
              >
                Mint Just This?
              </Button>
              <Popover
                id="mouse-over-popover1"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={openedPopoverId === 1}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverCloseSingle}
                disableRestoreFocus
              >
                <Typography className={classes.supportedFilesText}>
                  {multi[0].hoverText}
                </Typography>
              </Popover>
            </Box>
            {toggleMintSingle && (
              <Box>
                <Box mt={2} className={classes.label}>
                  <TextField
                    className={classes.margin}
                    label="Name"
                    variant="filled"
                    size="small"
                    // fullWidth
                    style={{
                      width: "380px",
                    }}
                    helperText="Name your artpiece"
                    InputLabelProps={{
                      style: { fontSize: 12 },
                    }}
                    FormHelperTextProps={{
                      style: { fontSize: 8 },
                    }}
                    value={singleName}
                    onChange={handleSingleName}
                  />
                </Box>

                <Box className={classes.label}>
                  <TextField
                    className={classes.margin}
                    label="Description"
                    variant="filled"
                    size="small"
                    multiline
                    rows={2}
                    style={{
                      width: "380px",
                    }}
                    helperText="Set a description for your art"
                    InputLabelProps={{
                      style: { fontSize: 12 },
                    }}
                    FormHelperTextProps={{
                      style: { fontSize: 8 },
                    }}
                    value={singleDescription}
                    onChange={handleSingleDescription}
                  />
                </Box>

                <Box py={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{
                      width: "380px",
                      marginBottom: "10px",
                    }}
                    startIcon={<MonetizationOnIcon />}
                    disabled={mintIsLoading || generateIsLoading}
                    onMouseEnter={handleMintSingleOnHover}
                    onMouseLeave={handleMintSingleOnClose}
                    onClick={mintSingle}
                  >
                    Mint Non-Styled
                  </Button>
                </Box>
              </Box>
            )}
            {txHash !== "" && (
              <Box className={classes.txText}>
                <Typography
                  onClick={() =>
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
          </Grid>

          <Grid item xs={12} md={4}>
            <DropZone
              setImage={setImage2}
              isStyleImg={true}
              title="Style Image"
              togglePreview={togglePreview}
              setTogglePreview={setTogglePreview}
              show={toggleStylePreview}
              setToggleBasePreview={setToggleBasePreview}
              setToggleStylePreview={setToggleStylePreview}
              dropText="#2 - Drag &amp; Drop or Click Here to Select a Style Image"
              previewText="AI? Here Next"
              previewText2="Click or Drag and Drop an image."
              previewText3="*Only .JPG, .JPEG, .PNG, .JFIF files supported"
              type={2}
            />
            <Box m={0}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  width: "380px",
                }}
                startIcon={<PowerIcon />}
                disabled={mintIsLoading || generateIsLoading}
                onClick={generate}
                onMouseEnter={(e) => handlePopoverOpenGenerate(e, 2)}
                onMouseLeave={handlePopoverCloseGenerate}
              >
                Generate AI-Styled
              </Button>
              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={openedPopoverId === 2}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverCloseGenerate}
                disableRestoreFocus
              >
                <Typography className={classes.supportedFilesText}>
                  {multi[1].hoverText}
                </Typography>
              </Popover>
            </Box>

            <Box mt={2}>
              {" "}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{
                  width: "380px",
                }}
                startIcon={<RestoreIcon />}
                disabled={mintIsLoading || generateIsLoading}
                onClick={handleStartOver}
              >
                Start Over
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <MintForm
              renderGenerated={renderGenerated}
              imgBlob={imgBlob}
              generateIsLoading={generateIsLoading}
              mintIsLoading={mintIsLoading}
              setMintIsLoading={setMintIsLoading}
              setTogglePreview={setTogglePreview}
              handleMintOnHover={handleMintOnHover}
              handleMintOnClose={handleMintOnClose}
              handleDownloadOnClose={handleDownloadOnClose}
              handleDownloadOnHover={handleDownloadOnHover}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              marginTop={-14}
            >
              <Scroll
                to="createHelp"
                smooth={true}
                duration={1000}
                onMouseEnter={handleHowWorksOnHover}
                onMouseLeave={handleHowWorksOnClose}
              >
                <Typography className={classes.scrollText}>
                  <span className={classes.show}>Show </span>{" "}
                  <span className={classes.me}>Me </span>{" "}
                  <span className={classes.how}>How </span>
                  <span className={classes.this}>This </span>
                  <span className={classes.works}>Works </span>
                </Typography>
                <IconButton>
                  <ExpandMoreIcon className={classes.goDown} />
                </IconButton>
              </Scroll>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.topPic}>
              {hoverNumber && (
                <Box className={classes.imgLineUp}>
                  <img src={DoOne} className={classes.img} alt="hoverNumber" />
                </Box>
              )}
              {hoverChunky && (
                <Box className={classes.imgLineUp}>
                  <Typography> Go Go AI Generate!</Typography>
                  <img
                    src={RunningChunky}
                    className={classes.img}
                    alt="hoverChunky"
                  />
                </Box>
              )}
              {hoverDrake && (
                <Box className={classes.imgLineUp}>
                  <Typography>Mint it!</Typography>
                  <img src={Drake} className={classes.img} alt="hoverDrake" />
                </Box>
              )}
              {hoverDownload && (
                <Box className={classes.imgLineUp}>
                  <img
                    src={DownloadingIt}
                    className={classes.img}
                    alt="hoverDownload"
                  />
                </Box>
              )}
              {hoverMintSingle && (
                <Box className={classes.imgLineUp}>
                  <Typography>Mint Just One</Typography>
                  <img
                    src={Number1}
                    className={classes.img}
                    alt="hoverMintSingle"
                  />
                </Box>
              )}
              {hoverHowWorks && (
                <Box className={classes.imgLineUp}>
                  <img
                    src={AliensBro}
                    className={classes.img}
                    alt="hoverHowWorks"
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Create;
