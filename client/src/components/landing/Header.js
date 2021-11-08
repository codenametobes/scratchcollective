import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import { Link as Scroll } from "react-scroll";

import NavbarDark from "../layout/NavbarDark";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#eeeeee",
    fontSize: "3rem",
  },
  colorText: {
    color: "#6d28b1",
  },
  title: {
    color: "#eeeeee",
    fontSize: "3.5rem",
  },
  container: {
    textAlign: "center",
  },
  goDown: {
    color: "#eeeeee",
    fontSize: "2.5rem",
  },
  scrollText: {
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#eeeeee",
  },
  subTitle: {
    fontSize: "1.2rem",
    color: "#ffffff",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  const history = useHistory();

  const handleCreate = () => {
    history.push("/create");
  };

  const handleView = () => {
    history.push("/view/collection");
  };

  const handleFAQ = () => {
    history.push("/about");
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <NavbarDark />
      <Collapse
        in={checked}
        {...(true ? { timeout: 1000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.container}>
          <Typography className={classes.title}>
            Welcome to <br />
            <span className={classes.colorText}>ScratchCollective</span> <br />
          </Typography>
          <Box marginTop={5}>
            <Typography className={classes.subTitle}>
              An Easy-to-Use NFT Minting/AI Art Generation Tool
            </Typography>
          </Box>

          <Box marginTop={4}>
            <Grid
              container
              spacing={7}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCreate}
                  color="primary"
                  style={{ width: "120px" }}
                >
                  Create
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleView}
                  color="primary"
                  style={{ width: "120px" }}
                >
                  Explore
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={handleFAQ}
                  style={{ width: "120px" }}
                >
                  FAQs
                </Button>
              </Grid>
            </Grid>
            <Box marginTop={4}>
              <Scroll to="page-1" smooth={true} duration={1000}>
                <Typography className={classes.scrollText}>
                  How does it work?
                </Typography>
                <IconButton>
                  <ExpandMoreIcon className={classes.goDown} />
                </IconButton>
              </Scroll>
            </Box>
          </Box>
        </div>
      </Collapse>
    </div>
  );
};

export default Navbar;
