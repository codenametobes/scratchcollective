import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

import { Modal, Link, Box, Backdrop } from "@material-ui/core";

const useStyles = makeStyles({
  app: {
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  backdrop: {
    backdropFilter: "blur(5px)",
  },
  menuFontWrapper: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "3vh",
    fontWeight: 500,
    padding: "10px 45px",
    position: "relative",
    lineHeight: "60px",
    "&:hover": {
      color: "#BD899E",
      textDecoration: "none",
    },
  },
});

const Menu = ({ buttonState, handleMenuClose }) => {
  const classes = useStyles();

  return (
    <Box
      component={Modal}
      open={buttonState}
      className={classes.app}
      border="1px grey dotted"
      alignItems="center"
      justifyContent="center"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
        classes: {
          root: classes.backdrop,
        },
      }}
      onClick={handleMenuClose}
      TransitionComponent={Slide}
    >
      <Box>
        <Box textAlign="center">
          <Link
            component={RouterLink}
            to="/"
            className={classes.menuFontWrapper}
          >
            Home
          </Link>
        </Box>

        <Box textAlign="center">
          <Link
            component={RouterLink}
            to="/about"
            className={classes.menuFontWrapper}
          >
            How It Works
          </Link>
        </Box>

        <Box textAlign="center">
          <Link
            component={RouterLink}
            to="/view/collection"
            className={classes.menuFontWrapper}
          >
            Explore Collection
          </Link>
        </Box>

        <Box textAlign="center">
          <Link
            component={RouterLink}
            to="/creators"
            className={classes.menuFontWrapper}
          >
            Creators
          </Link>
        </Box>

        <Box textAlign="center">
          <Link
            component={RouterLink}
            to="/create#createMint"
            className={classes.menuFontWrapper}
          >
            Mint/Create
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
