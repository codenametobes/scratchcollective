// collection of artists (rendered masonry style)
import React, { useEffect, useState } from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import { CssBaseline, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NavbarDark from "../layout/NavbarDark";
import CreatorImageCard from "./CreatorImageCard";

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
    marginTop: "10vh",
  },
  title: {
    textAlign: "center",
    fontSize: "3.5rem",
    color: "#ffffff",
  },
  titleBox: {
    display: "flex",
    marginBottom: "4vh",
  },
}));

const Creators = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    console.log(`Creators component useEffect starting...${Date.now()}`);

    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }

    const getAllUsers = async () => {
      await fetch(`/api/users/all`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setUsersData(data))
        .catch(() => {
          console.log("did not receive");
        });
    };

    getAllUsers();
  }, [dispatch]);

  const testCollection = usersData.map((user) => (
    <CreatorImageCard user={user} key={user.publicAddress} />
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavbarDark />
      <Box width="80vw" className={classes.box}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.titleBox}
            >
              <Typography className={classes.title}>
                Artists 🧑‍🎨 Creators
              </Typography>
            </Box>
            <Box>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 800: 3, 1200: 4 }}
              >
                <Masonry>{testCollection}</Masonry>
              </ResponsiveMasonry>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Creators;
