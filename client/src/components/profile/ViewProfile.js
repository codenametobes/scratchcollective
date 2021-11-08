import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

import NavbarDark from "../layout/NavbarDark";
import ImageCard from "./UserCollectionImageCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    marginTop: "5vh",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  myMasonryGrid: {
    display: "flex",
    marginLeft: "-0px",
    backgroundClip: "border-box",
  },
  myMasonryGridColumn: {
    paddingLeft: "0px",
    backgroundClip: "border-box",
  },
  titleText: {
    color: "#ffffff",
    fontSize: "3vw",
  },
  addressText: {
    color: "#bcbcbc",
    fontSize: "0.7vw",
    cursor: "pointer",
  },
  bioText: {
    color: "#ffffff",
  },
}));

const ViewProfile = () => {
  const classes = useStyles();
  const { publicAddress } = useParams();
  const dispatch = useDispatch();
  const [collectionData, setCollectionData] = useState([]);
  const [userData, setUserData] = useState();

  const handleInsta = (instaHandle) => {
    window.open(`www.instagram.com/${instaHandle}`);
  };

  const handleFacebook = (facebookUrl) => {
    window.open(facebookUrl);
  };

  const handleTwitter = (twitterHandle) => {
    window.open(`www.twitter.com/${twitterHandle}`);
  };

  const onMouseOver = (event) => {
    const el = event.target;
    el.style.color = "#DDA8FC";
  };

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#FFFFFF";
    el.style.color = white;
  };

  useEffect(() => {
    console.log(
      `collection by user component useEffect starting...${Date.now()}`
    );

    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }

    const getCollection = async () => {
      await fetch(`/api/view/collection/${publicAddress}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setCollectionData(data))
        .catch(() => {
          console.log("did not receive collection data");
        });
    };

    const getUser = async () => {
      await fetch(`/api/users/view/${publicAddress}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch(() => {
          console.log("did not receive user data");
        });
    };

    getCollection();
    getUser();
  }, [dispatch, publicAddress]);

  const testCollection = collectionData.map((art) => (
    <Box
      display="flex"
      border="0px grey"
      alignItems="center"
      justifyContent="center"
      key={art.scratchCollectiveId}
    >
      <ImageCard art={art} key={art.scratchCollectiveId} />
    </Box>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavbarDark />
      <Box border="0px grey dotted" width="80vw" className={classes.box}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              border="0px grey"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={userData ? userData.profilePicUrl : ""}
                alt={"Profile Pic"}
                style={{
                  borderRadius: "50%",
                  width: "34vh",
                  height: "34vh",
                  background: "black",
                  display: "block",
                }}
                border="1px"
              />
            </Box>
            <Box
              display="flex"
              border="0px grey"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.titleText}>
                {userData ? userData.name : ""}
              </Typography>
            </Box>
            <Box
              display="flex"
              border="0px grey"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                className={classes.addressText}
                onMouseEnter={(event) => onMouseOver(event)}
                onMouseOut={(event) => onMouseOut(event)}
                onClick={() =>
                  window.open(
                    `https://etherscan.io/address/${
                      userData ? userData.publicAddress : ""
                    }`,
                    "_blank"
                  )
                }
              >
                {userData ? userData.publicAddress : ""}
              </Typography>
            </Box>
            <Box
              display="flex"
              border="0px grey"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.bioText}>
                {userData ? userData.bio : ""}
              </Typography>
            </Box>
            <Box
              display="flex"
              border="0px grey"
              alignItems="center"
              justifyContent="center"
              className={classes.buttons}
            >
              <IconButton
                key="one"
                variant="contained"
                color="primary"
                onClick={() => handleInsta(userData.instagram)}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton
                key="two"
                variant="contained"
                color="primary"
                onClick={handleFacebook}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                key="three"
                variant="contained"
                color="primary"
                onClick={handleTwitter}
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Box>
            {testCollection.length > 0 ? (
              <Slide
                easing="ease"
                duration={5000}
                transitionDuration={1000}
                autoplay={true}
                slidesToShow={testCollection.length >= 4 ? 4 : 1}
              >
                {testCollection}
              </Slide>
            ) : (
              <Box
                display="flex"
                border="0px grey"
                alignItems="center"
                justifyContent="center"
              >
                <Typography className={classes.bioText}>
                  Our artist is still in the middle of their creative process!
                  (No art yet)
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ViewProfile;
