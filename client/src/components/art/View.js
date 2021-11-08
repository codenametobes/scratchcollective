import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Box, Grid, Button, Typography } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";

import NavbarDark from "../layout/NavbarDark";

import DescriptionTable from "./DescriptionTable";
import SellOpenSeaModal from "./SellOpenSeaModal";
import {
  FacebookShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  FacebookIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  styleImage: {
    display: "flex",
    maxHeight: "85%",
    maxWidth: "85%",
    height: "100%",
    borderRadius: "1%",
  },
  parentImage: {
    display: "flex",
    maxHeight: "75%",
    maxWidth: "75%",
    borderRadius: "2.5%",
    margin: 0,
    color: "#ffffff",
    fontSize: "0.8vw",
  },
  descriptionBody: {
    fontSize: "1vw",
    color: "#F3F3F3",
  },
  title: {
    fontSize: "2.5vw",
    color: "#F3F3F3",
  },
  parentTitle: {
    fontSize: "1.8vw",
    color: "#F3F3F3",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
    marginTop: 6,
  },
}));

const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [artData, setArtData] = useState({
    description: "",
    imgUrl: "",
    ipfsImgUri: "",
    name: "",
    tokenUri: "",
    originalCreator: "",
    scratchCollectiveId: "",
    txHash: "",
    creationDate: "",
    parents: {
      baseImageUrl: "",
      styleImageUrl: "",
    },
  });
  const [showOSModal, setShowOSModal] = useState(false);

  const currentAccount = useSelector((state) => state.user.user.publicAddress);

  const handleCreateAnother = () => {
    history.push("/create");
  };

  const toggleOSModal = () => {
    setShowOSModal(true);
  };

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
    const getArtPiece = async (piece) => {
      await fetch(`/api/view/nft/${piece}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setArtData(data))
        .catch(() => {
          console.log("did not receive");
        });
    };

    getArtPiece(id);
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      {console.log(`View component rendered: ${Date.now()}`)}
      <CssBaseline />
      <NavbarDark />
      <Box sx={{ m: 12 }}>
        <Grid container spacing={2}>
          <Grid
            item
            direction="column"
            md={7}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={artData.imgUrl}
              className={classes.styleImage}
              alt="Styled"
            />
          </Grid>

          <Grid
            item
            md={5}
            xs={12}
            style={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box border="0px dashed grey">
              <Typography className={classes.title}>{artData.name}</Typography>
              <Typography className={classes.descriptionBody}>
                {artData.description}
              </Typography>

              <Box sx={{ mt: 2, mb: 3, display: "inline" }}>
                <DescriptionTable
                  ipfsImgUri={artData.ipfsImgUri}
                  tokenUri={artData.tokenUri}
                  scratchCollectiveId={artData.scratchCollectiveId}
                  txHash={artData.txHash}
                  creationDate={artData.creationDate}
                  originalCreator={artData.originalCreator}
                />
              </Box>

              {artData.parents.baseImageUrl !==
                "Single Image, Base image N/A" && (
                <Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography className={classes.parentTitle}>
                      Parents:
                    </Typography>
                  </Box>

                  <Box
                    marginBottom={3}
                    marginTop={0.5}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                      boxSizing: "content-box",
                    }}
                  >
                    <Box border="0px grey dotted" width="50%" align="center">
                      <img
                        src={
                          artData.parents.baseImageUrl
                            ? artData.parents.baseImageUrl
                            : ""
                        }
                        className={classes.parentImage}
                        alt="Parent 1"
                      />
                    </Box>
                    <Box border="0px grey dotted" width="50%" align="center">
                      <img
                        src={
                          artData.parents.styleImageUrl
                            ? artData.parents.styleImageUrl
                            : ""
                        }
                        className={classes.parentImage}
                        alt="Parent 2"
                      />
                    </Box>
                  </Box>
                </Box>
              )}

              <Box
                className={classes.buttons}
                display="flex"
                justifyContent="center"
              >
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <RedditShareButton url={window.location.href}>
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
                <TumblrShareButton url={window.location.href}>
                  <TumblrIcon size={32} round={true} />
                </TumblrShareButton>
              </Box>

              <Box
                className={classes.buttons}
                display="flex"
                justifyContent="center"
              >
                {artData.originalCreator === currentAccount && (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={toggleOSModal}
                  >
                    Sell me on OPENSEA!
                  </Button>
                )}

                <Button
                  onClick={handleCreateAnother}
                  variant="contained"
                  color="primary"
                  size="small"
                  m={2}
                >
                  Create Another
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SellOpenSeaModal
        setShowOSModal={setShowOSModal}
        showOSModal={showOSModal}
      />
    </div>
  );
};

export default View;
