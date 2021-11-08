import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as Scroll } from "react-scroll";

import { CssBaseline, Box, Typography, IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import MintSingleInstructions1 from "../../assets/mintsingleinstructions1.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#d9d2e9",
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center",
  },
  questionTitle: {
    fontSize: "3rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  italicText: {
    fontStyle: "italic",
    fontSize: "1rem",
    fontWeight: 300,
  },
  bodyStructure: {
    display: "flex",
    paddingTop: "80px",
    paddingRight: "70px",
  },
  bodyWidth: {
    width: "85%",
    marginTop: 6,
    paddingLeft: "65px",
  },
  bodyText: {
    fontSize: "1rem",
  },
  bodySpacing: {
    marginTop: 25,
  },
  img: {
    height: 500,
    borderRadius: "5%",
  },
  imgMargin: {
    marginRight: 15,
    marginTop: 25,
  },
  metamaskImg: {
    height: 800,
  },
  scrollText: {
    color: "#000000",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  goDown: {
    color: "#C06699",
    fontSize: "3rem",
  },
  arrow: {
    marginLeft: "50px",
  },
}));

const CreateHelp3 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} id="createHelp3">
      <CssBaseline />

      <Box textAlign="center" className={classes.bodyStructure}>
        <Box textAlign="left" className={classes.bodyWidth}>
          <Box>
            <Typography className={classes.bodyText}>
              You can mint a{" "}
              <span className={classes.boldText}>single image</span> by
              following the directions below. ⬇️
            </Typography>
          </Box>
          <Box mt={3} className={classes.imgMargin}>
            <img
              src={MintSingleInstructions1}
              className={classes.img}
              alt="mint single instructions 1"
            />
          </Box>

          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Similar to minting an AI-generated NFT, a Metamask pop-up will
              show (upper right) and ask you to{" "}
              <span className={classes.boldText}>"Confirm"</span>. Again, no
              Ether will be spent if you click{" "}
              <span className={classes.boldText}>"Reject"</span>
            </Typography>
          </Box>

          <Box mt={3.2}>
            <Scroll to="createMint" smooth={true} duration={1000}>
              <Typography className={classes.scrollText}>
                Back to MINT Page
              </Typography>
              <IconButton className={classes.arrow}>
                <ExpandLessIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </Box>
        </Box>

        <Box>
          <Typography className={classes.questionTitle}>
            MINTING A SINGLE IMAGE 💸
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CreateHelp3;
