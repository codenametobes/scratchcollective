import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as Scroll } from "react-scroll";

import {
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import mintAiInstructions from "../../assets/instructions.PNG";
import mintTxHash from "../../assets/mintTxHash.PNG";
import MetamaskNotifMint from "../../assets/metamasknotifMint1.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#ffffff",
    alignItems: "flex-start",
    paddingTop: "0px",
    display: "flex",
    justifyContent: "center",
  },
  questionTitle: {
    fontSize: "2.5rem",
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
    paddingTop: "70px",
    paddingRight: "20px",
    marginBottom: 100,
  },
  bodyWidth: {
    width: "85%",
    marginTop: 6,
    paddingLeft: "10px",
  },
  bodyText: {
    fontSize: "1rem",
  },
  bodySpacing: {
    marginTop: 10,
  },
  scrollSpacing: {
    marginTop: 25,
  },
  img: {
    height: 700,
  },
  imgMargin: {
    marginRight: 15,
  },
  metamaskImg: {
    marginTop: 25,
    height: 750,
  },
  goDown: {
    color: "#C06699",
    fontSize: "3.5rem",
  },
  scrollText: {
    color: "#000000",
    fontSize: "1.8rem",
    cursor: "pointer",
  },
  notifImg: {
    marginTop: 10,
    width: 1000,
    height: "auto",
  },
}));

const CreateHelp2 = () => {
  const classes = useStyles();
  const [toggleMeta, setToggleMeta] = useState(false);

  const handletoggleMeta = () => {
    setToggleMeta(!toggleMeta);
  };

  return (
    <div className={classes.root} id="createHelp2">
      <CssBaseline />

      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Typography className={classes.questionTitle}>
            MINTING
            <br />
            AI-GENERATED ART 🤖
          </Typography>
        </Box>
        <Box textAlign="center" className={classes.bodyWidth}>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.boldText}>
              You can mint an AI-Generated image by following the directions
              below. ⬇️
            </Typography>
          </Box>
          <Box className={classes.imgMargin} mt={3}>
            <img
              src={mintAiInstructions}
              className={classes.img}
              alt="mint ai instructions 1"
            />
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              ✅ If your{" "}
              <span className={classes.boldText}>
                Metmask Wallet Extension is installed, you are connected, and on
                the right network
              </span>
              , a popup Metamask notification should appear (usually in the top
              right corner) ⬇️
            </Typography>
          </Box>
          <Box className={classes.bodySpacing}>
            <Typography className={classes.bodyText}>
              Click <span className={classes.boldText}> "Confirm" </span> to
              send the transaction
              <br />
              Click <span className={classes.boldText}>"Reject" </span> to
              cancel
            </Typography>
          </Box>
          <Box m={2}>
            {" "}
            <Button
              fullwidth
              variant="outlined"
              color="primary"
              onClick={handletoggleMeta}
            >
              More About What You're Seeing in the Metamask Wallet
            </Button>
          </Box>

          {toggleMeta && (
            <Box>
              <img
                src={MetamaskNotifMint}
                className={classes.metamaskImg}
                alt="mint ai instructions 2"
              />
            </Box>
          )}

          <Box mt={10}>
            <Typography className={classes.bodyText}>
              ✅ Upon completing the mint process, you should receieve a little
              alert notification on the bottom left corner of the screen. You
              will automatically to be redirected to the view page.
              <span className={classes.boldText}>
                {" "}
                Note that the minting transaction may take a while.
              </span>{" "}
              However, you can check on your transaction's progress by clicking
              the Transaction Hash link that should show up shortly after
              confirming the transaction.
            </Typography>
          </Box>
          <Box>
            <img
              src={mintTxHash}
              className={classes.notifImg}
              alt="mint ai instructions 3"
            />
          </Box>
          <Box className={classes.scrollSpacing} textAlign="center">
            <Typography>
              <span className={classes.scrollText}>Minting a Single Image</span>
            </Typography>
            <Scroll to="createHelp3" smooth={true} duration={1000}>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateHelp2;
