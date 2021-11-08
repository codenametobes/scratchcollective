import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { CssBaseline, Box, Typography } from "@material-ui/core";

import BackGround2 from "../../assets/backgroundtest2.jpg";

import NavbarDark from "./NavbarDark";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${BackGround2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: "2.2vw",
    fontWeight: "bold",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavbarDark />
      <Box paddingTop={39}>
        <Typography className={classes.text}>
          Looks like the page you're looking for doesn't exist! 😞
        </Typography>
      </Box>
    </div>
  );
};

export default NotFoundPage;
