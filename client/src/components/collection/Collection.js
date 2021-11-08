import React, { useState, useEffect } from "react";

import { CssBaseline, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../layout/NavbarDark";
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";

import MintOwn from "./MintOwn";

import { userActions } from "../../store/user-slice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100vw",
    background: "#eeeeee",
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
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
}));

const breakpointColumnsObj = {
  default: 5,
  1803: 4,
  1200: 3,
  700: 2,
  500: 1,
};

const Collection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }

    const getCollection = async () => {
      await fetch(`/api/view/collection`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setCollectionData(data))
        .catch(() => {
          console.log("did not receive");
        });
    };

    getCollection();
  }, [dispatch]);

  const testCollection = collectionData.map((art) => (
    <ImageCard art={art} key={art.scratchCollectiveId} />
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ m: 0, width: "100%" }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.myMasonryGrid}
          columnClassName={classes.myMasonryGridColumn}
        >
          <MintOwn />
          {testCollection}
        </Masonry>
      </Box>
    </div>
  );
};

export default Collection;
